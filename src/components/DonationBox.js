import React, { useState } from 'react';
import { Box, Button, Typography, Snackbar, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SolanaIcon from '../assets/solana-icon.svg';

const WHSTLR_WALLET = '6VRXRqBENHv5B89WsvTFPexRUAGYAT9zKP1igA9QHrTF';

const DonationBox = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(WHSTLR_WALLET);
    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '16px',
        padding: '20px',
        maxWidth: '500px',
        margin: '20px auto',
        border: '1px solid #9945FF',
        boxShadow: '0 0 10px rgba(153, 69, 255, 0.3)',
      }}
    >
      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
        🚀 Support $WHSTLR
      </Typography>
      
      <Typography variant="body1" sx={{ color: '#ccc', mb: 2 }}>
        Help us expose corruption in the crypto space! Your donations keep our whistleblower platform running and memes flowing.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '10px',
          borderRadius: '8px',
          mb: 2,
        }}
      >
        <img 
          src={SolanaIcon} 
          alt="Solana" 
          style={{ width: '24px', height: '24px', marginRight: '10px' }}
        />
        <Typography
          sx={{
            color: '#14F195',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            flexGrow: 1,
            wordBreak: 'break-all',
          }}
        >
          {WHSTLR_WALLET}
        </Typography>
        <IconButton 
          onClick={handleCopyAddress}
          sx={{ color: '#9945FF' }}
        >
          <ContentCopyIcon />
        </IconButton>
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={() => window.open(`https://solscan.io/account/${WHSTLR_WALLET}`, '_blank')}
        sx={{
          background: 'linear-gradient(45deg, #9945FF 30%, #14F195 90%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(45deg, #8935EF 30%, #04E185 90%)',
          },
        }}
      >
        View on Solscan
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Wallet address copied! 🎉"
      />
    </Box>
  );
};

export default DonationBox;
