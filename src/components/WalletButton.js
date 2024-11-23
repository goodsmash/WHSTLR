import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { styled } from '@mui/material/styles';

const StyledWalletButton = styled(WalletMultiButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  backgroundImage: 'linear-gradient(45deg, #7C4DFF 30%, #B388FF 90%)',
  '&:hover': {
    backgroundImage: 'linear-gradient(45deg, #651FFF 30%, #7C4DFF 90%)',
  },
  borderRadius: '12px',
  padding: '10px 24px',
  height: '42px',
  fontSize: '1rem',
  border: 'none',
  color: 'white',
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  '& .wallet-adapter-button-start-icon': {
    marginRight: '8px',
  },
}));

function WalletButton() {
  const { wallet } = useWallet();

  return <StyledWalletButton />;
}

export default WalletButton;
