import { createTheme } from '@mui/material/styles';

const dosisFont = {
  fontFamily: "'Dosis', sans-serif",
};

const theme = createTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif", 
    h1: { ...dosisFont },
    h2: { ...dosisFont },
    h3: { ...dosisFont },
    h4: { ...dosisFont },
    h5: { ...dosisFont },
    h6: { ...dosisFont },
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