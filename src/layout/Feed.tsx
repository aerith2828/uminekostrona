import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useOutlet } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';

const pageTitle = (pathname: string): string => {
  if (pathname.startsWith('/games')) return 'Visual Novelki';
  if (pathname.startsWith('/gallery')) return 'Galeria';
  if (pathname.startsWith('/discord')) return 'Discord';
  return 'Ogłoszenia';
};

const Feed: FC = () => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <Box sx={{
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: 'rgba(0, 0, 0, 0.67)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(201, 168, 76, 0.39)',
      borderRadius: '6px',
      color: '#f0e8d5',
      overflow: 'hidden',
      img: {
        maxWidth: '100%',
        maxHeight: '100%',
      },
    }}>
      <Typography component="h1" sx={{
        px: '19px',
        py: '16px',
        fontWeight: 700,
        fontSize: 21,
        lineHeight: '27px',
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        color: 'rgba(255, 239, 194, 0.86)',
      }}>
        {pageTitle(location.pathname)}
      </Typography>
      <Box sx={{ px: { xs: 1, md: '8px' }, pb: '8px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {element}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Feed;
