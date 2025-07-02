
import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
const Footer = () => {
  return (
  <Box
      component="footer"
      sx={{
        background: 'linear-gradient(45deg, #1b5e20 30%, #388e3c 90%)',
        color: "white",
        textAlign: "center",
        py: 3,
        mt: "auto",
        px: 2,
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        &copy; {new Date().getFullYear()} <strong style={{ color: '#ffc107' }}>Clean India</strong>
      </Typography>

      <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
        Built with ❤️ for a cleaner and greener India
      </Typography>

      <Box sx={{ mt: 2 }}>
        <MuiLink
          href="https://github.com/CodeCraftsmanRohit"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "#ffc107",
            textDecoration: "none",
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            '&:hover': {
              textDecoration: 'underline'
            },
          }}
        >
          <GitHubIcon fontSize="small" /> View on GitHub
        </MuiLink>
      </Box>
    </Box>
  );
};
export default Footer;
