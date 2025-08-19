import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

// Mock user data
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+254 712 345 678',
  location: 'Nairobi, Kenya',
  type: 'provider',
  avatar: 'https://source.unsplash.com/random/150x150/?portrait',
  bio: 'Professional plumber with over 5 years of experience in residential and commercial plumbing services.',
  skills: ['Plumbing', 'Pipe Fitting', 'Water Heater Installation', 'Leak Detection'],
  settings: {
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
  },
};

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(mockUser);
  const [settings, setSettings] = useState(mockUser.settings);

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleProfileUpdate = () => {
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Overview */}
        <Grid component="div" item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                src={profileData.avatar}
                sx={{
                  width: 150,
                  height: 150,
                  mb: 2,
                  border: '4px solid',
                  borderColor: 'primary.main',
                }}
              />
              <Button
                variant="contained"
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: -8,
                  minWidth: 'auto',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                }}
              >
                <EditIcon fontSize="small" />
              </Button>
            </Box>
            <Typography variant="h5" gutterBottom>
              {profileData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {profileData.type === 'provider' ? 'Service Provider' : 'Customer'}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {profileData.bio}
            </Typography>
            {profileData.type === 'provider' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                  {profileData.skills.map((skill) => (
                    <Chip key={skill} label={skill} variant="outlined" size="small" />
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Profile Details and Settings */}
        <Grid component="div" item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Profile Information</Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </Box>

            <List>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Full Name"
                  secondary={profileData.name}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary={profileData.email}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Phone"
                  secondary={profileData.phone}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Location"
                  secondary={profileData.location}
                />
              </ListItem>
            </List>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Receive updates and reminders via email"
                />
                <Switch
                  edge="end"
                  checked={settings.emailNotifications}
                  onChange={() => handleSettingChange('emailNotifications')}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="SMS Notifications"
                  secondary="Receive updates and reminders via SMS"
                />
                <Switch
                  edge="end"
                  checked={settings.smsNotifications}
                  onChange={() => handleSettingChange('smsNotifications')}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Two-Factor Authentication"
                  secondary="Add an extra layer of security to your account"
                />
                <Switch
                  edge="end"
                  checked={settings.twoFactorAuth}
                  onChange={() => handleSettingChange('twoFactorAuth')}
                />
              </ListItem>
            </List>

            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid component="div" item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </Grid>
                <Grid component="div" item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </Grid>
                <Grid component="div" item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                </Grid>
                <Grid component="div" item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, location: e.target.value }))
                    }
                  />
                </Grid>
                <Grid component="div" item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    multiline
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid component="div" item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </Grid>
              <Grid component="div" item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </Grid>
              <Grid component="div" item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </Grid>
              <Grid component="div" item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={profileData.location}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, location: e.target.value }))
                  }
                />
              </Grid>
              <Grid component="div" item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleProfileUpdate} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 