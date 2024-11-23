import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  Grid,
  Tooltip,
  CircularProgress
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import BarChartIcon from '@mui/icons-material/BarChart';

const MemeStats = ({ stats, selectedProvider }) => {
  const [timeUntilReset, setTimeUntilReset] = useState(null);
  const [resetDate, setResetDate] = useState(null);

  useEffect(() => {
    // Calculate next reset time (top of next hour)
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(nextHour.getHours() + 1);
    nextHour.setMinutes(0);
    nextHour.setSeconds(0);
    setResetDate(nextHour);

    // Update countdown timer
    const updateTimer = () => {
      const now = new Date();
      const timeDiff = resetDate - now;
      if (timeDiff > 0) {
        const minutes = Math.floor(timeDiff / 60000);
        const seconds = Math.floor((timeDiff % 60000) / 1000);
        setTimeUntilReset(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      } else {
        // Refresh stats when timer hits 0
        window.location.reload();
      }
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [resetDate]);

  // Calculate progress percentages
  const totalProgress = (stats.totalGenerated / stats.totalLimit) * 100;
  const hourlyProgress = (stats.hourlyGenerated / stats.limitPerUser) * 100;

  // Determine progress bar colors
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'error';
    if (percentage >= 70) return 'warning';
    return 'success';
  };

  return (
    <Paper sx={{ p: 3, mb: 3, background: 'rgba(0, 0, 0, 0.8)', color: 'white' }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <BarChartIcon /> Meme Generation Stats
      </Typography>

      {/* Total Progress */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">
            Total Memes Remaining
          </Typography>
          <Typography variant="body2" color={getProgressColor(totalProgress)}>
            {stats.memesRemaining} / {stats.totalLimit}
          </Typography>
        </Box>
        <Tooltip title={`${Math.round(totalProgress)}% used`}>
          <LinearProgress 
            variant="determinate" 
            value={totalProgress || 0}
            aria-label="Total memes progress"
            aria-valuenow={totalProgress || 0}
            aria-valuemin={0}
            aria-valuemax={100}
            color={getProgressColor(totalProgress)}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Tooltip>
      </Box>

      {/* Hourly Progress */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">
            Your Hourly Usage
          </Typography>
          <Typography variant="body2" color={getProgressColor(hourlyProgress)}>
            {stats.hourlyGenerated} / {stats.limitPerUser}
          </Typography>
        </Box>
        <Tooltip title={`${Math.round(hourlyProgress)}% of hourly limit`}>
          <LinearProgress 
            variant="determinate" 
            value={hourlyProgress || 0}
            aria-label="Hourly memes progress"
            aria-valuenow={hourlyProgress || 0}
            aria-valuemin={0}
            aria-valuemax={100}
            color={getProgressColor(hourlyProgress)}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Tooltip>
      </Box>

      {/* Detailed Stats Grid */}
      <Grid container spacing={2}>
        {/* Reset Timer */}
        <Grid item xs={12} sm={4}>
          <Box sx={{ 
            p: 2, 
            borderRadius: 2, 
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <AccessTimeIcon sx={{ mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Limit Resets In
            </Typography>
            <Typography variant="h6">
              {timeUntilReset || '--:--'}
            </Typography>
          </Box>
        </Grid>

        {/* Generation Speed */}
        <Grid item xs={12} sm={4}>
          <Box sx={{ 
            p: 2, 
            borderRadius: 2, 
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <SpeedIcon sx={{ mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Avg. Generation Time
            </Typography>
            <Typography variant="h6">
              {stats.avgGenerationTime || '~4.5s'}
            </Typography>
          </Box>
        </Grid>

        {/* Success Rate */}
        <Grid item xs={12} sm={4}>
          <Box sx={{ 
            p: 2, 
            borderRadius: 2, 
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <TrendingUpIcon sx={{ mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Success Rate
            </Typography>
            <Typography variant="h6">
              {stats.successRate || '99.8%'}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Provider Info */}
      <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Typography variant="body2" color="text.secondary">
          Current Provider: <strong>{selectedProvider.toUpperCase()}</strong>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Note: Generation limits are shared across all providers
        </Typography>
      </Box>
    </Paper>
  );
};

export default MemeStats;
