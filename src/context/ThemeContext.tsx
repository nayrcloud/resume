import * as themes from '../style/theme';
import { createContext, useMemo, useState } from 'react';
import { Mode, Theme, themeDefault } from '../style/theme';
import { CssBaseline, ThemeOptions, ThemeProvider, capitalize, createTheme } from '@mui/material';
import deepmerge from 'deepmerge';
import { InfoTwoTone, CheckCircleTwoTone, ErrorTwoTone } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';

interface ThemeContextType {
    theme: Theme;
    mode: Mode;
    setTheme: (theme: Theme) => void;
    setMode: (mode: Mode) => void;
    themeOptions: ThemeOptions;
}

const setTheme = (theme: Theme, callback: any) => {
    localStorage.setItem('theme', theme);

    callback(theme);
};

const setMode = (mode: Mode, callback: any) => {
    localStorage.setItem('mode', mode);

    callback(mode);
};

const initialThemeContext: ThemeContextType = {
    theme: (localStorage.getItem('theme') as Theme) || 'default',
    mode: (localStorage.getItem('mode') as Mode) || 'light',
    setTheme: () => null,
    setMode: () => null,
    themeOptions: themeDefault
};

const ThemeContext = createContext<ThemeContextType>(initialThemeContext);

const ThemeContextProvider: React.FC<React.HTMLProps<HTMLElement>> = ({
    children
}: React.HTMLProps<HTMLElement>) => {
    const [theme, setThemeState] = useState<Theme>(initialThemeContext.theme);
    const [mode, setModeState] = useState<Mode>(initialThemeContext.mode);

    const themeName = `theme${capitalize(theme)}`;
    const themeOptions = themes[themeName as keyof typeof themes] as ThemeOptions;
    const modePalette = themes[`${mode}Palette${capitalize(theme)}` as keyof typeof themes];
    const muiTheme = useMemo(() => {
        let themePalette = {
            mode
        };

        if (modePalette) {
            themePalette = { ...themePalette, ...modePalette };
        }

        return createTheme(
            deepmerge(themeOptions, {
                palette: themePalette
            })
        );
    }, [theme, mode]);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <ThemeContext.Provider
                value={{
                    theme: theme,
                    setTheme: (theme: Theme) => setTheme(theme, setThemeState),
                    mode,
                    setMode: (mode: Mode) => setMode(mode, setModeState),
                    themeOptions: muiTheme
                }}
            >
                <Toaster
                    toastOptions={{
                        style: {
                            color: muiTheme.palette.text.primary,
                            background: muiTheme.palette.background.paper,
                            maxWidth: 550,
                            wordBreak: 'break-word'
                        },
                        icon: <InfoTwoTone color='info' />,
                        success: {
                            icon: <CheckCircleTwoTone color='success' />
                        },
                        error: {
                            icon: <ErrorTwoTone color='error' />
                        }
                    }}
                />
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
};

export { ThemeContext, ThemeContextProvider };
