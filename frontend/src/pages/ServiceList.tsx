import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Rating,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Mock data for services
const mockServices = [
  {
    id: 1,
    title: 'House Cleaning',
    provider: 'Clean Home Services',
    rating: 4.5,
    price: 25,
    image: 'https://source.unsplash.com/random/400x300/?cleaning',
    category: 'Cleaning',
    description: 'Professional house cleaning services with attention to detail.',
  },
  {
    id: 2,
    title: 'Plumbing Repair',
    provider: 'Quick Fix Plumbers',
    rating: 4.8,
    price: 45,
    image: 'https://source.unsplash.com/random/400x300/?plumbing',
    category: 'Plumbing',
    description: 'Expert plumbing services for all your repair needs.',
  },
  {
    id: 3,
    title: 'Electrical Installation',
    provider: 'Power Pros',
    rating: 4.7,
    price: 35,
    image: 'https://source.unsplash.com/random/400x300/?electrician',
    category: 'Electrical',
    description: 'Licensed electricians for safe and reliable installations.',
  },
  // Add more mock services as needed
];

const categories = [
  'All',
  'Cleaning',
  'Plumbing',
  'Electrical',
  'Gardening',
  'Painting',
  'Moving',
];

const ServiceList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const servicesPerPage = 6;

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Services"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {filteredServices.map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/services/${service.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={service.image}
                alt={service.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {service.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {service.provider}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={service.rating} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({service.rating})
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {service.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${service.price}/hr
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  Book Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(filteredServices.length / servicesPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ServiceList; 