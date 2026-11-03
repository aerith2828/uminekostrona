import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faGamepad, faImages, faNewspaper, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface NavItem {
  title: string;
  link: string;
  icon: IconDefinition;
}

const items: NavItem[] = [
  { title: 'Ogłoszenia', link: '/', icon: faNewspaper },
  { title: 'Visual Novelki', link: '/games', icon: faGamepad },
  { title: 'Galeria', link: '/gallery', icon: faImages },
  { title: 'Discord', link: '/discord', icon: faDiscord },
];

const Navbar: FC = () => {
  return (
    <Box component="header" sx={{ position: 'relative', zIndex: 10 }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 2,
        px: { xs: 2, md: '41px' },
        py: '14px',
        minHeight: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.67)',
        borderBottom: '1px solid rgba(201, 168, 76, 0.39)',
        backdropFilter: 'blur(26px)',
      }}>
        <NavLink to="/" style={{ display: 'block', lineHeight: 0 }}>
          <img
            src="/umilogo.png"
            alt="Umineko"
            style={{
              height: 88,
              display: 'block',
              filter: 'drop-shadow(0 0 31px rgba(201, 168, 76, 0.16))',
            }}
          />
        </NavLink>
        <Typography sx={{
          display: { xs: 'none', sm: 'block' },
          pb: 1,
          fontStyle: 'italic',
          fontWeight: 600,
          fontSize: 23,
          lineHeight: '30px',
          maxWidth: 388,
          color: 'rgba(255, 239, 194, 0.18)',
          userSelect: 'none',
        }}>
          without love, it cannot be seen
        </Typography>
      </Box>

      <Box
        component="nav"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 2.5, md: '45px' },
          px: { xs: 1, md: 4 },
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderBottom: '1px solid rgba(201, 168, 76, 0.39)',
          boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(26px)',
        }}
      >
        {items.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            end={item.link === '/'}
            style={{ textDecoration: 'none', flex: 'none' }}
          >
            {({ isActive }) => (
              <Box sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                height: 62,
                px: 1.5,
                color: isActive ? '#fff' : 'rgba(255, 239, 194, 0.86)',
                transition: 'color 0.2s ease',
                '&:hover': { color: '#FFD766' },
                // poswiata i pasek pod aktywna pozycja
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                  background: 'radial-gradient(60% 100% at 50% 100%, rgba(255, 215, 102, 0.12) 30%, rgba(255, 215, 102, 0) 100%)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 3,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                  background: 'radial-gradient(50% 1500% at 50% 50%, rgba(255, 215, 102, 0.74) 30%, rgba(255, 215, 102, 0) 100%)',
                },
              }}>
                <FontAwesomeIcon icon={item.icon} style={{ fontSize: 22, width: 28 }} />
                <Typography sx={{
                  fontWeight: 700,
                  fontSize: 17,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  color: 'inherit',
                }}>
                  {item.title}
                </Typography>
              </Box>
            )}
          </NavLink>
        ))}
      </Box>
    </Box>
  );
};

export default Navbar;
