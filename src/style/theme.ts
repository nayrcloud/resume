import { ThemeOptions } from '@mui/material';

export type Theme = 'default' | 'orange';
export type Mode = 'dark' | 'light';

const themeDefault: ThemeOptions = {
    palette: {
        primary: {
            main: '#56817a'
        },
        background: {
            default: '#F3F3F3'
        }
    },
    typography: {
        fontFamily: 'Roboto'
    },
    spacing: 5,
    shape: {
        borderRadius: 3
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    }
};

const darkPaletteDefault = {
    background: {
        default: '#161E2D',
        paper: '#232F3E'
    }
};

export { themeDefault, darkPaletteDefault };
