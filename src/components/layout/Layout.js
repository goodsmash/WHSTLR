import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../Navbar';

const Layout = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Box component="main" sx={{ pt: 8, pb: 6 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
