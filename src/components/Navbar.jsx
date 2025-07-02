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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "About", path: "/about" },
    { label: "History", path: "/pasthistory" },
    { label: "Profile", path: "/profile" },
    { label: "Logout", path: "/" },
  ];

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
            to="/"
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
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
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
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
