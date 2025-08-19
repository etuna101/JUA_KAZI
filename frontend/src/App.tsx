import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ServiceList from './pages/ServiceList';
import ServiceDetails from './pages/ServiceDetails';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import About from './pages/About';
import Contact from './pages/Contact';
import { NotificationProvider } from './components/common/NotificationProvider';
import ErrorBoundary from './components/common/ErrorBoundary';

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <ErrorBoundary>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServiceList />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </ErrorBoundary>
    </NotificationProvider>
  );
};

export default App; 