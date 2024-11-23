import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Tooltip,
  useTheme,
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
import { StyledCard, GradientBox, StyledChip } from '../styles/shared';

const Home = () => {
  const theme = useTheme();
  const { connected } = useWallet();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Hero Section */}
        <Grid item xs={12}>
          <GradientBox>
            <Typography variant="h2" align="center" gutterBottom>
              WHSTLR
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Exposing Crypto Corruption Through AI-Powered Memes
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
              {!connected && <WalletButton />}
            </Box>
          </GradientBox>
        </Grid>

        {/* Meme Generator */}
        <Grid item xs={12}>
          <MemeGenerator />
        </Grid>

        {/* Features */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <Box sx={{ p: 3 }}>
              <LocalFireDepartmentIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              <Typography variant="h6" gutterBottom>
                AI-Powered Memes
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Create viral memes using state-of-the-art AI technology
              </Typography>
            </Box>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <Box sx={{ p: 3 }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              <Typography variant="h6" gutterBottom>
                Blockchain Integration
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Seamlessly connect with Solana for secure transactions
              </Typography>
            </Box>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <Box sx={{ p: 3 }}>
              <MonetizationOnIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              <Typography variant="h6" gutterBottom>
                Token Rewards
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Earn WHSTLR tokens for creating and sharing memes
              </Typography>
            </Box>
          </StyledCard>
        </Grid>

        {/* Community Section */}
        <Grid item xs={12}>
          <StyledCard>
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <GroupIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Join Our Community
              </Typography>
              <Box sx={{ mt: 2 }}>
                <IconButton href="https://t.me/whstlr" target="_blank" color="primary">
                  <TelegramIcon />
                </IconButton>
                <IconButton href="https://twitter.com/whstlr" target="_blank" color="primary">
                  <TwitterIcon />
                </IconButton>
                <IconButton href="https://discord.gg/whstlr" target="_blank" color="primary">
                  <ChatIcon />
                </IconButton>
              </Box>
            </Box>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
