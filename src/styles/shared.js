import { styled } from '@mui/material';
import { Card, Box, Chip, Paper, Container } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
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

export const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.1) 0%, rgba(68, 138, 255, 0.1) 100%)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  border: '1px solid rgba(124, 77, 255, 0.2)',
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  background: 'rgba(124, 77, 255, 0.1)',
  border: '1px solid rgba(124, 77, 255, 0.2)',
  '&:hover': {
    background: 'rgba(124, 77, 255, 0.2)',
  }
}));

export const GlowContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50px',
    left: '-50px',
    right: '-50px',
    bottom: '-50px',
    background: 'radial-gradient(circle at center, rgba(124, 77, 255, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
    zIndex: 0,
  }
}));

export const AnimatedPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  background: 'rgba(124, 77, 255, 0.02)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(124, 77, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(124, 77, 255, 0.3)',
    boxShadow: '0 4px 20px rgba(124, 77, 255, 0.1)',
  }
}));
