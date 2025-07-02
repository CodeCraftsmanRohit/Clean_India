import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b5e20",  // Darker green
      light: "#4c8c4a",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#ffc107",  // Amber for accents
      dark: "#ff8f00"
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff"
    },
    success: {
      main: "#2e7d32"
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #1b5e20 30%, #4c8c4a 90%)',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 20px rgba(0,0,0,0.12)'
          }
        }
      }
    }
  }
});

export default theme;