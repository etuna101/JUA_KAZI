import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  AccountCircle,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../common/NotificationProvider';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(false); // Placeholder for theme state
  // Placeholder user info
  const isAuthenticated = true; // Set to false to hide avatar/profile
  const user = { name: 'Jane Doe', avatar: '', email: 'jane@example.com' };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
    // Integrate with your theme provider as needed
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
          }}
        >
          JuaKazi
        </Typography>

        {/* Theme Switcher */}
        <IconButton sx={{ ml: 1 }} color="inherit" onClick={handleThemeToggle}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {/* User Avatar/Profile Menu */}
        {isAuthenticated && !isMobile && (
          <>
            <IconButton color="inherit" onClick={handleProfileMenu} sx={{ ml: 1 }}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} style={{ width: 32, height: 32, borderRadius: '50%' }} />
              ) : (
                <AccountCircle fontSize="large" />
              )}
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem disabled>{user.name}</MenuItem>
              <MenuItem onClick={() => { handleNavigation('/profile'); handleProfileMenuClose(); }}>Profile</MenuItem>
              <MenuItem onClick={() => { /* Add logout logic here */ handleProfileMenuClose(); }}>Logout</MenuItem>
            </Menu>
          </>
        )}

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
              <MenuItem onClick={() => handleNavigation('/about')}>About Us</MenuItem>
              <MenuItem onClick={() => handleNavigation('/contact')}>Contact</MenuItem>
              <MenuItem onClick={() => handleNavigation('/services')}>
                Services
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('/login')}>
                Login
              </MenuItem>
              <MenuItem onClick={() => handleNavigation('/register')}>
                Register
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/about"
            >
              About Us
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/contact"
            >
              Contact
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/services"
            >
              Services
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              startIcon={<PersonIcon />}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 