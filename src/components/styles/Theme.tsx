import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#42A5F5', // Primary color for the thumb
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#4285F5', // Darker shade on hover
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1', // Background of the scrollbar track
        },
      },
    },
  }
});

interface IThemeProps {
  children: React.ReactNode
}

const Theme = ({ children }: IThemeProps) => {
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
};

export default Theme;
