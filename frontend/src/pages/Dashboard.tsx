import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tab,
  Tabs,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
  Card,
  CardContent,
  Rating,
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon,
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
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

// Mock data
const mockBookings = [
  {
    id: 1,
    service: 'House Cleaning',
    date: '2023-12-01',
    time: '10:00 AM',
    status: 'Upcoming',
    customer: 'John Doe',
  },
  {
    id: 2,
    service: 'Plumbing Repair',
    date: '2023-12-03',
    time: '2:00 PM',
    status: 'Completed',
    customer: 'Jane Smith',
  },
];

const mockEarnings = {
  today: 150,
  week: 850,
  month: 3200,
};

const mockReviews = [
  {
    id: 1,
    customer: 'Alice Johnson',
    rating: 5,
    comment: 'Excellent service! Very professional and thorough.',
    date: '2023-11-28',
  },
  {
    id: 2,
    customer: 'Bob Wilson',
    rating: 4,
    comment: 'Good work, would recommend.',
    date: '2023-11-25',
  },
];

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const userType = 'provider'; // This would come from auth context

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ width: 64, height: 64, mr: 2 }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="h4">Welcome Back!</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {userType === 'provider' ? 'Service Provider Dashboard' : 'Customer Dashboard'}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Stats Cards */}
        {userType === 'provider' && (
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ScheduleIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Today's Bookings</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    {mockBookings.length}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MoneyIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Monthly Earnings</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    ${mockEarnings.month}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StarIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Average Rating</Typography>
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ mr: 1 }}>4.8</Typography>
                    <Rating value={4.8} precision={0.1} readOnly />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Tabs */}
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Bookings" />
              {userType === 'provider' && <Tab label="Reviews" />}
              {userType === 'provider' && <Tab label="Earnings" />}
            </Tabs>
          </Box>

          {/* Bookings Tab */}
          <TabPanel value={tabValue} index={0}>
            <List>
              {mockBookings.map((booking) => (
                <Paper key={booking.id} sx={{ mb: 2 }}>
                  <ListItem
                    secondaryAction={
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status) as any}
                      />
                    }
                  >
                    <ListItemText
                      primary={booking.service}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2">
                            {booking.date} at {booking.time}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="text.secondary">
                            Customer: {booking.customer}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          </TabPanel>

          {/* Reviews Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              {mockReviews.map((review) => (
                <Grid item xs={12} key={review.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 2 }}>
                          {review.customer}
                        </Typography>
                        <Rating value={review.rating} readOnly />
                      </Box>
                      <Typography variant="body2" paragraph>
                        {review.comment}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {review.date}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Earnings Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    Today's Earnings
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 2 }}>
                    ${mockEarnings.today}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    Weekly Earnings
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 2 }}>
                    ${mockEarnings.week}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    Monthly Earnings
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 2 }}>
                    ${mockEarnings.month}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 