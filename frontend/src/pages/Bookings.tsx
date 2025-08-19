import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`bookings-tabpanel-${index}`}
      aria-labelledby={`bookings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

// Mock booking data
const mockBookings = [
  {
    id: 1,
    service: 'House Cleaning',
    provider: 'Clean Home Services',
    date: '2023-12-15',
    time: '10:00 AM',
    location: 'Nairobi, Kenya',
    status: 'upcoming',
    price: 25,
  },
  {
    id: 2,
    service: 'Plumbing Repair',
    provider: 'Quick Fix Plumbers',
    date: '2023-12-10',
    time: '2:00 PM',
    location: 'Mombasa, Kenya',
    status: 'completed',
    price: 45,
    rating: 4,
  },
  {
    id: 3,
    service: 'Electrical Work',
    provider: 'Power Pros',
    date: '2023-12-05',
    time: '11:30 AM',
    location: 'Kisumu, Kenya',
    status: 'cancelled',
    price: 35,
  },
];

const Bookings: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<typeof mockBookings[0] | null>(null);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: '',
  });

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReviewSubmit = () => {
    // TODO: Implement review submission logic
    console.log('Review submitted:', { booking: selectedBooking, review: reviewData });
    setIsReviewOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const openReviewDialog = (booking: typeof mockBookings[0]) => {
    setSelectedBooking(booking);
    setReviewData({ rating: booking.rating || 0, comment: '' });
    setIsReviewOpen(true);
  };

  const filteredBookings = (status: string) =>
    mockBookings.filter((booking) => booking.status === status);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Upcoming" />
          <Tab label="Completed" />
          <Tab label="Cancelled" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {filteredBookings('upcoming').map((booking) => (
            <Grid item xs={12} key={booking.id}>
              <Paper sx={{ p: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h6" gutterBottom>
                      {booking.service}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {booking.provider}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ScheduleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {booking.date} at {booking.time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {booking.location}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${booking.price}
                    </Typography>
                    <Chip
                      label={booking.status.toUpperCase()}
                      color={getStatusColor(booking.status)}
                      sx={{ mb: 2 }}
                    />
                    <Box>
                      <Button variant="outlined" color="error">
                        Cancel Booking
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {filteredBookings('completed').map((booking) => (
            <Grid item xs={12} key={booking.id}>
              <Paper sx={{ p: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h6" gutterBottom>
                      {booking.service}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {booking.provider}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ScheduleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {booking.date} at {booking.time}
                      </Typography>
                    </Box>
                    {booking.rating && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={booking.rating} readOnly size="small" />
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${booking.price}
                    </Typography>
                    <Chip
                      label={booking.status.toUpperCase()}
                      color={getStatusColor(booking.status)}
                      sx={{ mb: 2 }}
                    />
                    {!booking.rating && (
                      <Box>
                        <Button
                          variant="outlined"
                          onClick={() => openReviewDialog(booking)}
                        >
                          Leave Review
                        </Button>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {filteredBookings('cancelled').map((booking) => (
            <Grid item xs={12} key={booking.id}>
              <Paper sx={{ p: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h6" gutterBottom>
                      {booking.service}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {booking.provider}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ScheduleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {booking.date} at {booking.time}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${booking.price}
                    </Typography>
                    <Chip
                      label={booking.status.toUpperCase()}
                      color={getStatusColor(booking.status)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Review Dialog */}
      <Dialog open={isReviewOpen} onClose={() => setIsReviewOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Leave a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Rating
                value={reviewData.rating}
                onChange={(event, newValue) => {
                  setReviewData((prev) => ({ ...prev, rating: newValue || 0 }));
                }}
                size="large"
              />
            </Box>
            <TextField
              fullWidth
              label="Your Review"
              multiline
              rows={4}
              value={reviewData.comment}
              onChange={(e) =>
                setReviewData((prev) => ({ ...prev, comment: e.target.value }))
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsReviewOpen(false)}>Cancel</Button>
          <Button onClick={handleReviewSubmit} variant="contained">
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Bookings; 