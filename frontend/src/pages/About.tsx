import React from 'react';
import { Box, Typography } from '@mui/material';

const About: React.FC = () => (
  <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
    <Typography variant="h3" gutterBottom>About Us</Typography>
    <Typography variant="body1">
      JuaKazi connects you with trusted, skilled labourers for all your home and business needs. Our mission is to make it easy and safe to find reliable professionals in your area, from cleaning and plumbing to electrical work and more.
    </Typography>
  </Box>
);

export default About; 