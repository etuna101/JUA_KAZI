import React from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import SearchBar from '../components/common/SearchBar';
import { useNavigate } from 'react-router-dom';

const skilledLabourers = [
  {
    name: 'Jane Mwangi',
    skill: 'Plumber',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'John Otieno',
    skill: 'Electrician',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Mary Wanjiku',
    skill: 'Gardener',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Peter Kamau',
    skill: 'Painter',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  // Replace with your actual authentication logic
  const isAuthenticated = false; // e.g., from Redux or Context
  const userRole = null; // 'customer' or 'provider'

  const handleCustomerClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/services');
    }
  };

  const handleProviderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/post-service'); // or your provider dashboard
    }
  };

  const handleSearch = (searchTerm: string, filters: any) => {
    // You can navigate to ServiceList or filter here
    // For now, just log
    console.log(searchTerm, filters);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80) center/cover no-repeat',
          minHeight: 350,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          mb: 4,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Find Trusted Skilled Labourers
        </Typography>
        <Typography variant="h5" gutterBottom>
          Book reliable professionals for your home and business needs
        </Typography>
        <Box sx={{ width: '100%', maxWidth: 600, mt: 3 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
      </Box>

      {/* Quick Access Boxes */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, my: 6 }}>
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            background: '#f5f5f5',
            minWidth: 250,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s',
            '&:hover': { boxShadow: 6 },
          }}
          onClick={handleCustomerClick}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Find a Service
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Looking for help? Browse and book trusted professionals.
          </Typography>
        </Box>
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            background: '#f5f5f5',
            minWidth: 250,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s',
            '&:hover': { boxShadow: 6 },
          }}
          onClick={handleProviderClick}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Post a Service
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Are you a skilled worker? Offer your services to customers.
          </Typography>
        </Box>
      </Box>

      {/* Featured Skilled Labourers */}
      <Box sx={{ px: 2, mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Featured Skilled Labourers
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {skilledLabourers.map((worker, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card sx={{ maxWidth: 300, mx: 'auto', boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={worker.image}
                  alt={worker.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {worker.name}
                  </Typography>
                  <Typography color="text.secondary">{worker.skill}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="primary" fullWidth>
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* How It Works */}
      <Box sx={{ background: '#f5f5f5', py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center">1. Search</Typography>
            <Typography align="center">Find the service you need using our search bar.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center">2. Book</Typography>
            <Typography align="center">Choose a skilled labourer and book instantly.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center">3. Enjoy</Typography>
            <Typography align="center">Relax while the job gets done professionally.</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
