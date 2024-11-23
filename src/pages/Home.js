import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Tooltip,
  Chip,
  styled,
  useTheme,
  Paper
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TelegramIcon from '@mui/icons-material/Telegram';
import ChatIcon from '@mui/icons-material/Chat';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupIcon from '@mui/icons-material/Group';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletButton from '../components/WalletButton';
import MemeGenerator from '../components/MemeGenerator';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(124, 77, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(124, 77, 255, 0.2)',
  height: '100%',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  }
}));

const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.1) 0%, rgba(68, 138, 255, 0.1) 100%)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  border: '1px solid rgba(124, 77, 255, 0.2)',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  background: 'rgba(124, 77, 255, 0.1)',
  border: '1px solid rgba(124, 77, 255, 0.2)',
  '&:hover': {
    background: 'rgba(124, 77, 255, 0.2)',
  }
}));

const tokenPrompts = [
  "WHSTLR token mooning with frogs jumping over the moon ",
  "Pepe the frog exposing corrupt crypto CEOs with WHSTLR",
  "Army of frogs HODLing WHSTLR tokens",
  "WHSTLR token chart going up with celebration frogs",
  "Whistleblower frog uncovering the next crypto scandal",
  "To the moon with WHSTLR and the frog army",
  "Diamond hands holding WHSTLR tokens",
  "WHSTLR token crushing FUD with facts"
];

function Home() {
  const theme = useTheme();
  const wallet = useWallet();

  const memeQuotes = [
    "🐸 Ribbit if you're with us!",
    "🎯 Exposing corruption, one meme at a time!",
    "🌟 The power of memes for good!",
    "🚀 Join the whistleblower revolution!",
    "🎭 Truth through humor!"
  ];

  const [currentQuote, setCurrentQuote] = useState(memeQuotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(memeQuotes[Math.floor(Math.random() * memeQuotes.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Memes Generated', value: '9,001+', icon: '🎨' },
    { label: 'Community Members', value: '42,069', icon: '🐸' },
    { label: 'Truths Exposed', value: '1,337', icon: '🎯' },
    { label: 'Based Level', value: 'Over 9000', icon: '🚀' }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          sx={{ 
            mb: 2,
            background: 'linear-gradient(45deg, #7C4DFF 30%, #448AFF 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          🐸 WHSTLR 
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {currentQuote}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Empowering whistleblowers through the power of memes! 🚀
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button 
            variant="contained" 
            startIcon={<TelegramIcon />}
            href="https://t.me/whstlr"
            target="_blank"
            sx={{
              background: 'linear-gradient(45deg, #7C4DFF 30%, #448AFF 90%)',
              color: 'white'
            }}
          >
            Join Community
          </Button>
        </Box>
      </Box>

      {/* Fun Stats */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StyledCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  {stat.icon}
                </Typography>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Meme Generator Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
          🎨 Meme Generator 
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          Create hilarious whistleblower memes and share them with the community! 🚀
        </Typography>
        <MemeGenerator />
      </Box>

      {/* Community Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
          🌟 Join the Revolution
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <TelegramIcon sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Telegram Community
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Join our vibrant meme community! 🚀
                </Typography>
                <Button 
                  variant="outlined" 
                  href="https://t.me/whstlr" 
                  target="_blank"
                >
                  Join Now
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <TwitterIcon sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Twitter Updates
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Fresh memes daily! 🐦
                </Typography>
                <Button 
                  variant="outlined" 
                  href="https://twitter.com/whstlr" 
                  target="_blank"
                >
                  Follow Us
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent sx={{ textAlign: 'center' }}>
                <ChatIcon sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Discord Server
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Share memes & make friends! 💬
                </Typography>
                <Button 
                  variant="outlined" 
                  href="https://discord.gg/whstlr" 
                  target="_blank"
                >
                  Join Server
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
