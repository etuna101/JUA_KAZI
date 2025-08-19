import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              JuaKazi
            </Typography>
            <Typography variant="body2">
              Connecting local service providers with customers in your area.
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} fontSize="small" />
              <Link href="tel:+254700000000" color="inherit" underline="hover">+254 700 000 000</Link>
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon sx={{ mr: 1 }} fontSize="small" />
              <Link href="mailto:support@juakazi.co.ke" color="inherit" underline="hover">support@juakazi.co.ke</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/about" color="inherit" sx={{ mb: 1 }}>
                About Us
              </Link>
              <Link href="/services" color="inherit" sx={{ mb: 1 }}>
                Services
              </Link>
              <Link href="/contact" color="inherit" sx={{ mb: 1 }}>
                Contact
              </Link>
              <Link href="/privacy" color="inherit">
                Privacy Policy
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 4 }}
        >
          © {new Date().getFullYear()} JuaKazi. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 