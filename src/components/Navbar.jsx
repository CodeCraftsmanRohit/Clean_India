import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setOpen(false);
  };

  // Get home path based on user role
  const getHomePath = () => {
    if (!isAuthenticated) return "/login";
    if (user?.role === 'admin' || user?.role === 'moderator') return "/admin/dashboard";
    return "/submit";
  };

  // User links for regular users
  const userLinks = [
    { label: "Submit Complaint", path: "/submit" },
    { label: "History", path: "/history" },
    { label: "Profile", path: "/profile" },
    { label: "About", path: "/about" },
  ];

  // Admin links for admin and moderators
  const adminLinks = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Complaints", path: "/admin/complaints" },
    { label: "Users", path: "/admin/users" },
    { label: "Profile", path: "/profile" },
    { label: "About", path: "/about" },
  ];

  const guestLinks = [
    { label: "About", path: "/about" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];

  // Determine which links to show based on authentication and role
  const getNavLinks = () => {
    if (!isAuthenticated) return guestLinks;

    if (user?.role === 'admin' || user?.role === 'moderator') {
      return adminLinks;
    }

    return userLinks;
  };

  const navLinks = getNavLinks();

  const getRoleChip = () => {
    if (!user?.role || user.role === 'user') return null;

    const roleColors = {
      admin: 'error',
      moderator: 'warning'
    };

    return (
      <Chip
        label={user.role}
        color={roleColors[user.role]}
        size="small"
        sx={{ ml: 1, color: 'white', borderColor: 'white' }}
        variant="outlined"
      />
    );
  };

  return (
    <>
      <AppBar position="sticky" sx={{
        background: 'linear-gradient(45deg, #1b5e20 30%, #388e3c 90%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        py: 1
      }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to={getHomePath()} // ✅ Use dynamic home path
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "white",
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1
            }}
          >
            Clean India
            {getRoleChip()}
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: 'center' }}>
            {navLinks.map(({ label, path }) => (
              <Button
                key={label}
                component={Link}
                to={path}
                sx={{
                  color: 'white',
                  fontWeight: location.pathname === path ? 600 : 400,
                  bgcolor: location.pathname === path ? 'rgba(255,255,255,0.2)' : 'transparent',
                  borderRadius: 2,
                  px: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.15)'
                  }
                }}
              >
                {label}
              </Button>
            ))}
            {isAuthenticated && (
              <Button
                onClick={handleLogout}
                sx={{
                  color: 'white',
                  borderRadius: 2,
                  px: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.15)'
                  }
                }}
              >
                Logout
              </Button>
            )}
          </Box>

          {/* Hamburger for Mobile */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{ width: 250, pt: 2 }}
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <Box sx={{ px: 2, pb: 1, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" color="primary">
              Clean India
            </Typography>
            {user?.role && user.role !== 'user' && (
              <Chip
                label={user.role}
                color={user.role === 'admin' ? 'error' : 'warning'}
                size="small"
                sx={{ mt: 1 }}
              />
            )}
          </Box>

          <List>
            {navLinks.map(({ label, path }) => (
              <ListItem
                button
                key={label}
                component={Link}
                to={path}
                selected={location.pathname === path}
              >
                <ListItemText primary={label} />
              </ListItem>
            ))}
            {isAuthenticated && (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;