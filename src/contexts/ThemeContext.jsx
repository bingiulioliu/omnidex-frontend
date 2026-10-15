import { useState, useEffect, createContext } from "react";

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark'); // 'light' | 'dark'

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const value = {
        theme,       // stato corrente del tema
        toggleTheme, // funzione per cambiarlo
    };

    return (
        <ThemeContext value={value}>
            {children}
        </ThemeContext>
    );
}

export { ThemeContext, ThemeProvider };