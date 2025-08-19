import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 200px)', // Adjust for header/footer
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '6rem', sm: '8rem' },
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            color: 'text.primary',
          }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 4,
            maxWidth: 'sm',
          }}
        >
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound; 