import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  LinearProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletButton from '../components/WalletButton';
import AiInsights from '../components/AiInsights';
import SentimentAnalysis from '../components/SentimentAnalysis';
import MemeGenerator from '../components/MemeGenerator';

function Token() {
  const { publicKey } = useWallet();
  const [copySuccess, setCopySuccess] = useState('');
  
  const tokenMetrics = {
    price: '$0.000001',
    marketCap: '$1,000,000',
    holders: '1,000',
    burned: '10,000,000',
    volume24h: '$50,000',
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText('YOUR_TOKEN_ADDRESS');
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        $WHST Token Analytics
      </Typography>

      {/* Token Info Card */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.1) 0%, rgba(124, 77, 255, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(124, 77, 255, 0.2)',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              $WHST Token
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mr: 1 }}>
                Contract Address:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: 'rgba(124, 77, 255, 0.1)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                }}
              >
                Coming Soon...
              </Typography>
              <Tooltip title={copySuccess || 'Copy Address'}>
                <IconButton onClick={handleCopyAddress} size="small" sx={{ ml: 1 }}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            {!publicKey && (
              <Box sx={{ mt: 2 }}>
                <WalletButton />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {Object.entries(tokenMetrics).map(([key, value]) => (
                <Grid item xs={6} sm={4} key={key}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {key.toUpperCase()}
                    </Typography>
                    <Typography variant="h6">{value}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* AI Insights Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <AiInsights />
        </Grid>
        <Grid item xs={12} md={6}>
          <SentimentAnalysis />
        </Grid>
      </Grid>

      {/* Meme Generator Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.1) 0%, rgba(124, 77, 255, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(124, 77, 255, 0.2)',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          AI Meme Generator
        </Typography>
        <MemeGenerator />
      </Paper>
    </Container>
  );
}

export default Token;
