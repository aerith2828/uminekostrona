import { FC } from 'react';
import { Box } from '@mui/material';
import Feed from './Feed';
import Footer from '../components/Footer';

const Home: FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 193px)' }}>
      <Box sx={{
        flex: 1,
        width: 'calc(100% - 24px)',
        maxWidth: 1412,
        mx: 'auto',
        mt: 2.5,
      }}>
        <Feed />
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
