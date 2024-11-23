import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Token from './pages/Token';
import { WalletContextProvider } from './contexts/WalletContext';

function App() {
  return (
    <WalletContextProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Box component="main" sx={{ pt: 8, pb: 6 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/token" element={<Token />} />
          </Routes>
        </Box>
      </Box>
    </WalletContextProvider>
  );
}

export default App;
