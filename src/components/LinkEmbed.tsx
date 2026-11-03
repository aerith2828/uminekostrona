import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

interface LinkEmbedProps {
  url: string;
  title: string;
}

interface TweetMedia {
  type: 'video' | 'photo';
  url: string;
  poster?: string;
}

const youtubeId = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
};

// x.com, twitter.com i zamienniki do embedow (fixupx, fxtwitter, vxtwitter)
const tweetRef = (url: string): { user: string; id: string } | null => {
  const match = url.match(/^https?:\/\/(?:www\.)?(?:x|twitter|fixupx|fxtwitter|vxtwitter)\.com\/(\w+)\/status\/(\d+)/);
  return match ? { user: match[1], id: match[2] } : null;
};

const hostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

// publiczne API FxTwitter zwraca bezposrednie linki do mediow z posta
const fetchTweetMedia = async (user: string, id: string, signal: AbortSignal): Promise<TweetMedia | null> => {
  const res = await fetch(`https://api.fxtwitter.com/${user}/status/${id}`, { signal });
  if (!res.ok) return null;
  const media = (await res.json())?.tweet?.media;
  const video = media?.videos?.[0] ?? media?.all?.find((m: { type: string }) => m.type === 'video');
  if (video) {
    const mp4 = (video.formats ?? [])
      .filter((f: { container: string }) => f.container === 'mp4')
      .sort((a: { bitrate: number }, b: { bitrate: number }) => b.bitrate - a.bitrate)[0];
    return { type: 'video', url: mp4?.url ?? video.url, poster: video.thumbnail_url };
  }
  const photo = media?.photos?.[0];
  return photo ? { type: 'photo', url: photo.url } : null;
};

const LinkCard: FC<{ url: string }> = ({ url }) => (
  <Box
    component="a"
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      display: 'block',
      p: 2,
      textDecoration: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(201, 168, 76, 0.39)',
      borderRadius: '5px',
      color: 'rgba(255, 239, 194, 0.86)',
      transition: 'border-color 0.2s ease',
      '&:hover': { borderColor: 'rgba(255, 215, 102, 0.74)' },
    }}
  >
    <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#FFD766' }}>
      {hostname(url)} ↗
    </Typography>
    <Typography sx={{ fontStyle: 'italic', fontSize: 15, wordBreak: 'break-all', opacity: 0.7 }}>
      {url}
    </Typography>
  </Box>
);

const LinkEmbed: FC<LinkEmbedProps> = ({ url, title }) => {
  const videoId = youtubeId(url);
  const tweet = tweetRef(url);
  const [media, setMedia] = useState<TweetMedia | null>(null);

  useEffect(() => {
    if (!tweet) return;
    const controller = new AbortController();
    fetchTweetMedia(tweet.user, tweet.id, controller.signal)
      .then(setMedia)
      .catch(() => setMedia(null));
    return () => controller.abort();
  }, [tweet?.user, tweet?.id]);

  if (videoId) {
    return (
      <Box sx={{ aspectRatio: '16 / 9', borderRadius: '5px', overflow: 'hidden' }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
        />
      </Box>
    );
  }

  if (media?.type === 'video') {
    return (
      <Box sx={{ borderRadius: '5px', overflow: 'hidden', lineHeight: 0 }}>
        <video
          src={media.url}
          poster={media.poster}
          controls
          playsInline
          preload="none"
          style={{ width: '100%', display: 'block', backgroundColor: '#000' }}
        />
      </Box>
    );
  }

  if (media?.type === 'photo') {
    return (
      <Box component="a" href={url} target="_blank" rel="noopener noreferrer" sx={{ display: 'block', lineHeight: 0 }}>
        <img src={media.url} alt={title} style={{ width: '100%', borderRadius: 5, display: 'block' }} />
      </Box>
    );
  }

  return <LinkCard url={url} />;
};

export default LinkEmbed;
