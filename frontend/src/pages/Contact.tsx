import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Link } from '@mui/material';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setSubmitted(true);
    // Here you could send the form data to your backend or email service
    // e.g., fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h3" gutterBottom>Contact Us</Typography>
      <Typography variant="body1" gutterBottom>
        Have questions or need support? Reach out to us:
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Email: <Link href="mailto:support@juakazi.co.ke">support@juakazi.co.ke</Link><br />
        Phone: <Link href="tel:+254700000000">+254 700 000 000</Link>
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Your Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Your Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          multiline
          minRows={4}
        />
        {error && <Alert severity="error">{error}</Alert>}
        {submitted && <Alert severity="success">Thank you for contacting us! We will get back to you soon.</Alert>}
        <Button type="submit" variant="contained" color="primary">
          Send Message
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;
