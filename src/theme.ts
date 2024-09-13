import { createTheme } from '@mui/material/styles';

const dosisFont = {
  fontFamily: "'Dosis', sans-serif",
};

const theme = createTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif",
    h1: { ...dosisFont, fontSize: '3rem' },
    h2: { ...dosisFont, fontSize: '2rem' },
    h3: { ...dosisFont, fontSize: '1.5rem' },
    h4: { ...dosisFont, fontSize: '1.25rem' },
    h5: { ...dosisFont, fontSize: '1.125rem' },
    h6: { ...dosisFont, fontSize: '1rem' },
    body1: { ...dosisFont, fontSize: '1rem' },
    body2: { ...dosisFont, fontSize: '0.875rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Dosis', sans-serif",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: "'Dosis', sans-serif",
        },
      },
    },
  },
});



export default theme;