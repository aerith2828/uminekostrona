import React from 'react';
import { Typography, Link, Box } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ py: 2.5, width: '100%' }}>
      <Typography align="center" sx={{
        color: 'rgba(240, 232, 213, 0.35)',
        fontWeight: 600,
        fontSize: '0.95rem',
        letterSpacing: '0.04em',
      }}>
        {'✦ Copyright © '}
        <Link color="inherit" href="https://umineko.pl" underline="hover">umineko.pl</Link>
        {' - '}{new Date().getFullYear()}
        {' ✦'}
      </Typography>
    </Box>
  );
};

export default Footer;
