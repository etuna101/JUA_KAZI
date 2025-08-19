import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Avatar,
  Rating,
  Divider,
  TextField,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { CalendarMonth, AccessTime, LocationOn } from '@mui/icons-material';

// Mock service data
const mockService = {
  id: 1,
  title: 'House Cleaning',
  provider: {
    name: 'Clean Home Services',
    rating: 4.8,
    reviews: 156,
    image: 'https://source.unsplash.com/random/150x150/?portrait',
    description: 'Professional cleaning service with 5 years of experience.',
  },
  price: 25,
  image: 'https://source.unsplash.com/random/800x400/?cleaning',
  category: 'Cleaning',
  description: 'Professional house cleaning services with attention to detail. We use eco-friendly products and follow industry best practices.',
  features: [
    'Deep cleaning',
    'Eco-friendly products',
    'Trained professionals',
    'Insured service',
    'Satisfaction guaranteed',
  ],
  reviews: [
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      comment: 'Excellent service! Very thorough and professional.',
      date: '2023-11-20',
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 4,
      comment: 'Great job overall. Would recommend.',
      date: '2023-11-15',
    },
  ],
};

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  const handleBookingSubmit = () => {
    // TODO: Implement booking logic
    console.log('Booking submitted:', { date: bookingDate, time: bookingTime });
    setIsBookingOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Service Image and Basic Info */}
        <Grid item xs={12} md={8}>
          <Card>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
              }}
              src={mockService.image}
              alt={mockService.title}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {mockService.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={mockService.provider.rating} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({mockService.provider.reviews} reviews)
                </Typography>
                <Chip
                  label={mockService.category}
                  color="primary"
                  size="small"
                  sx={{ ml: 2 }}
                />
              </Box>
              <Typography variant="body1" paragraph>
                {mockService.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Features
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {mockService.features.map((feature, index) => (
                  <Chip key={index} label={feature} variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Provider Info and Booking */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={mockService.provider.image}
                sx={{ width: 60, height: 60, mr: 2 }}
              />
              <Box>
                <Typography variant="h6">{mockService.provider.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Service Provider
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" paragraph>
              {mockService.provider.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h4" color="primary" gutterBottom>
              ${mockService.price}/hr
            </Typography>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => setIsBookingOpen(true)}
            >
              Book Now
            </Button>
          </Paper>
        </Grid>

        {/* Reviews Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          {mockService.reviews.map((review) => (
            <Paper key={review.id} sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 2 }}>
                  {review.user}
                </Typography>
                <Rating value={review.rating} size="small" readOnly />
              </Box>
              <Typography variant="body2" paragraph>
                {review.comment}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {review.date}
              </Typography>
            </Paper>
          ))}
        </Grid>
      </Grid>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onClose={() => setIsBookingOpen(false)}>
        <DialogTitle>Book Service</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              type="date"
              label="Select Date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Select Time</InputLabel>
              <Select
                value={bookingTime}
                label="Select Time"
                onChange={(e) => setBookingTime(e.target.value)}
              >
                <MenuItem value="09:00">09:00 AM</MenuItem>
                <MenuItem value="10:00">10:00 AM</MenuItem>
                <MenuItem value="11:00">11:00 AM</MenuItem>
                <MenuItem value="14:00">02:00 PM</MenuItem>
                <MenuItem value="15:00">03:00 PM</MenuItem>
                <MenuItem value="16:00">04:00 PM</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsBookingOpen(false)}>Cancel</Button>
          <Button onClick={handleBookingSubmit} variant="contained">
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServiceDetails; 