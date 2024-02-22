// theme.ts

import { createTheme, Theme } from '@mui/material/styles';

// Define your custom typography options
const customTypography = {
  date: {
    fontWeight: 400,
    fontSize: '15px',
    lineHeight: '22.5px',
    color: '#5F5F5F',
    display: 'block',
  },
  widget: {
    fontWeight: 400,
    fontSize: '46.32px',
    lineHeight: '69.48px',
    display: 'flex',
    paddingTop: '15px',
  },
  bold: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '27px',
    display: 'block',
  },
  normal: {
    fontStyle: 'normal',
    fontWeight: 100,
    lineHeight: 'normal',
  },
  longText: {
    width: '80%',
    paddingBlock: '30px',
    lineHeight: '35.79px',
    display: 'block',
  },
  boldGreen: {
    fontWeight: 700,
    lineHeight: '36px',
    letterSpacing: '0em',
    color: '#2F854F',
    paddingTop: '3%',
    display: 'block',
  },
};

// Merge custom typography with default typography options
const theme: Theme = createTheme({
  palette: {
    background: {
      default: '#F1F1F1',
    },
    primary: {
      light: '#2F854F1A',
      main: '#000000',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#2F854F1A',
      main: '#2F854F',
      dark: '#D9D9D9',
      contrastText: '#FFFFFF',
    },
    success: {
      light: '#4CAF50',
      main: '#2E7D32',
      dark: '#1B5E20',
      contrastText: '#fff',
    },
    error: {
      light: '#EF5350',
      dark: '#C62828',
      main: '#D32F2F',
      contrastText: '#fff',
    },
    warning: {
      light: '#FF9800',
      dark: '#E65100',
      main: '#ED6C02',
      contrastText: '#fff',
    },
    info: {
      light: '#D9D9D9',
      dark: '#D9D9D9',
      main: '#D9D9D9',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    fontSize: 15,
    ...customTypography,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: '176px',
          height: '48px',
          justifyContent: 'left',
          textTransform: 'capitalize',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: '#2F854F1A',
            color: '#2E7D32',
          },
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            border: '1px solid #2F854F',
            backgroundColor: '#FFFFFF',
            color: 'black',
            width: '176px',
            height: '48px',
            textTransform: 'capitalize',
            marginBottom: '2%',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#2F854F1A',
              color: '#2E7D32',
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: '#2F854F',
            color: '#FFFFFF',
            width: '176px',
            height: '48px',
            justifyContent: 'center',
            textTransform: 'capitalize',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#2F854F1A',
              color: '#2E7D32',
            },
          },
        },
      ],
    },
  },
});

export default theme;
