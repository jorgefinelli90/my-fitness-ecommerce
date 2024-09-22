import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4a4a4a',
        },
        secondary: {
            main: '#d4af37',
        },
        background: {
            default: '#ffffff',
            paper: '#f8f8f8',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: '"Montserrat", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            '@media (min-width:600px)': {
                fontSize: '3.5rem',
            },
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
            '@media (min-width:600px)': {
                fontSize: '3rem',
            },
        },
        h6: {
            fontWeight: 500,
        },
        body1: {
            fontWeight: 400,
        },
        body2: {
            fontWeight: 300,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@font-face': {
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    fontDisplay: 'swap',
                    fontWeight: 400,
                    src: `local('Montserrat'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2')`,
                    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
                },
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

export default theme;
