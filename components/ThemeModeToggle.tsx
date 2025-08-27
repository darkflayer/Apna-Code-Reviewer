import React from 'react';
import { SunIcon, MoonIcon } from './icons/SeverityIcons';

export type ThemeMode = 'light' | 'dark';

interface ThemeModeToggleProps {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
}

export const ThemeModeToggle: React.FC<ThemeModeToggleProps> = ({ themeMode, setThemeMode }) => {
    const isDark = themeMode === 'dark';

    return (
        <button 
            onClick={() => setThemeMode(isDark ? 'light' : 'dark')} 
            className="flex items-center justify-center h-10 w-10 rounded-lg bg-btn-secondary-bg hover:bg-btn-secondary-hover-bg border border-border-default transition-colors text-secondary hover:text-primary"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
    );
};