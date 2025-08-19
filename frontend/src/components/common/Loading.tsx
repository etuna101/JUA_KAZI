import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...', fullScreen = false }) => {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <CircularProgress size={48} sx={{ mb: 2 }} />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.paper',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
};

export default Loading; 