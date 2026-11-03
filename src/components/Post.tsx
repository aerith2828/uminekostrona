import { FC, useLayoutEffect, useRef, useState } from 'react';
import { Typography, Box, ButtonBase } from '@mui/material';
import Markdown from 'react-markdown';
import LinkEmbed from './LinkEmbed';

interface PostProps {
  title: string;
  content: string;
  date?: Date;
  author?: string;
  // link do pokazania po prawej stronie tresci: YouTube jako player, post z X
  // z filmem lub zdjeciem jako media, kazdy inny adres jako karta z linkiem
  embed?: string;
  // dluzsze wpisy sa skracane z zanikaniem tekstu i przyciskiem "Czytaj dalej"
  collapsible?: boolean;
}

const COLLAPSED_HEIGHT = 150;

const formatDate = (date: Date) =>
  date.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });

const Post: FC<PostProps> = ({ title, content, date, author, embed, collapsible = false }) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const clipped = collapsible && overflowing && !expanded;

  useLayoutEffect(() => {
    if (!collapsible || !bodyRef.current) return;
    setOverflowing(bodyRef.current.scrollHeight > COLLAPSED_HEIGHT + 24);
  }, [collapsible, content]);

  return (
    <Box sx={{
      width: '100%',
      boxSizing: 'border-box',
      mb: '10px',
      p: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.52)',
      border: '1px solid rgba(201, 168, 76, 0.39)',
      boxShadow: 'inset 0 0 0 2px rgba(255, 216, 105, 0.14)',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: 2,
    }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{
          borderLeft: '5px solid rgba(255, 215, 102, 0.74)',
          pl: 2,
          py: '2px',
          mb: 1.5,
        }}>
          <Typography component="h2" sx={{
            fontWeight: 700,
            fontSize: { xs: 22, md: 28 },
            lineHeight: '36px',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            color: '#FFD766',
          }}>
            {title}
          </Typography>
          {(date || author) && (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mt: 0.25,
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: 16,
              color: 'rgba(255, 239, 194, 0.86)',
            }}>
              {date && <span>{formatDate(date)}</span>}
              {author && (
                <span>{author}</span>
              )}
            </Box>
          )}
        </Box>

        <Box
          ref={bodyRef}
          sx={{
            px: 0.5,
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: 20,
            lineHeight: '29px',
            color: 'rgba(255, 239, 194, 0.86)',
            overflow: 'hidden',
            maxHeight: clipped ? COLLAPSED_HEIGHT : 'none',
            // tekst zanika ku dolowi zamiast byc ucinany
            maskImage: clipped ? 'linear-gradient(180deg, #000 30%, transparent 100%)' : 'none',
            WebkitMaskImage: clipped ? 'linear-gradient(180deg, #000 30%, transparent 100%)' : 'none',
            '& p': { margin: '0 0 1em 0' },
            '& h1, & h2, & h3, & h4': {
              fontStyle: 'normal',
              color: '#FFD766',
              mt: 2,
              mb: 1,
            },
            '& a': { color: '#FFD766', '&:hover': { color: '#fff' } },
            '& strong': { color: '#fff' },
          }}
        >
          <Markdown>{content}</Markdown>
        </Box>

        {collapsible && overflowing && (
          <ButtonBase
            onClick={() => setExpanded((v) => !v)}
            sx={{
              mt: 0.5,
              ml: 0.5,
              fontFamily: 'inherit',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '0.04em',
              color: 'rgba(255, 215, 102, 0.74)',
              '&:hover': { color: '#FFD766' },
            }}
          >
            {expanded ? 'Zwiń ▴' : 'Czytaj dalej ▾'}
          </ButtonBase>
        )}
      </Box>

      {embed && (
        <Box sx={{
          flex: 'none',
          width: { xs: '100%', md: '38%' },
          alignSelf: { md: 'flex-start' },
        }}>
          <LinkEmbed url={embed} title={title} />
        </Box>
      )}
    </Box>
  );
};

export default Post;
