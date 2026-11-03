import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { linkDiscord } from '../Config';

const GUILD_ID = '1004049919377678366';

interface Member {
  id: string;
  username: string;
  avatar_url: string;
  status: 'online' | 'idle' | 'dnd';
}

interface Widget {
  name: string;
  instant_invite: string | null;
  presence_count: number;
  members: Member[];
}

const statusColor: Record<Member['status'], string> = {
  online: '#43b581',
  idle: '#faa61a',
  dnd: '#f04747',
};

const cardSx = {
  backgroundColor: 'rgba(0, 0, 0, 0.52)',
  border: '1px solid rgba(201, 168, 76, 0.39)',
  boxShadow: 'inset 0 0 0 2px rgba(255, 216, 105, 0.14)',
  borderRadius: '4px',
};

const DiscordLink: React.FC = () => {
  const [widget, setWidget] = useState<Widget | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://discord.com/api/guilds/${GUILD_ID}/widget.json`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then(setWidget)
      .catch(() => setWidget(null));
    return () => controller.abort();
  }, []);

  const invite = widget?.instant_invite ?? linkDiscord;

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '10px', alignItems: 'flex-start' }}>
      <Box sx={{ ...cardSx, flex: 1, width: '100%', minWidth: 0, p: '10px' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
          borderLeft: '5px solid rgba(255, 215, 102, 0.74)',
          pl: 2,
          py: '2px',
          mb: 1.5,
        }}>
          <Box>
            <Typography component="h2" sx={{
              fontWeight: 700,
              fontSize: { xs: 22, md: 28 },
              lineHeight: '36px',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              color: '#FFD766',
            }}>
              {widget?.name ?? 'UminekoPOL'}
            </Typography>
            {widget && (
              <Typography sx={{
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: 16,
                color: 'rgba(255, 239, 194, 0.86)',
              }}>
                {widget.presence_count} online
              </Typography>
            )}
          </Box>
          <Box
            component="a"
            href={invite}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              px: 2.5,
              py: 1,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#FFD766',
              backgroundColor: 'rgba(255, 215, 102, 0.1)',
              border: '1px solid rgba(255, 215, 102, 0.74)',
              borderRadius: '4px',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: '#fff',
                backgroundColor: 'rgba(255, 215, 102, 0.2)',
                boxShadow: '0 0 14px rgba(255, 215, 102, 0.16)',
              },
            }}
          >
            <FontAwesomeIcon icon={faDiscord} style={{ fontSize: 22 }} />
            Dołącz do serwera
          </Box>
        </Box>

        {widget && widget.members.length > 0 && (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
            gap: 0.5,
            maxHeight: 440,
            overflowY: 'auto',
            px: 0.5,
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(201, 168, 76, 0.39) transparent',
          }}>
            {widget.members.map((member) => (
              <Box key={member.id} sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                p: 0.75,
                borderRadius: '4px',
                '&:hover': { backgroundColor: 'rgba(255, 215, 102, 0.06)' },
              }}>
                <Box sx={{ position: 'relative', flex: 'none', lineHeight: 0 }}>
                  <img
                    src={member.avatar_url}
                    alt=""
                    width={32}
                    height={32}
                    style={{ borderRadius: '50%', display: 'block' }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    right: -2,
                    bottom: -2,
                    width: 11,
                    height: 11,
                    borderRadius: '50%',
                    backgroundColor: statusColor[member.status],
                    border: '2px solid #0b0906',
                  }} />
                </Box>
                <Typography noWrap sx={{
                  fontWeight: 600,
                  fontSize: 17,
                  color: 'rgba(255, 239, 194, 0.86)',
                }}>
                  {member.username}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box sx={{
        ...cardSx,
        flex: 'none',
        width: { xs: '100%', md: '38%' },
        p: '10px',
        lineHeight: 0,
      }}>
        <img
          src="/cackle.png"
          alt="ahaha.wav"
          style={{ width: '100%', borderRadius: 4, display: 'block' }}
        />
      </Box>
    </Box>
  );
};

export default DiscordLink;
