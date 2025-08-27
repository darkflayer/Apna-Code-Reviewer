import React from 'react';
import { Timer } from './Timer';
import { ThemeSelector } from './ThemeSelector';
import { ThemeModeToggle, ThemeMode } from './ThemeModeToggle';
import { ThemeName } from '../themes';

interface HeaderProps {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    themeName: ThemeName;
    setThemeName: (name: ThemeName) => void;
}

export const Header: React.FC<HeaderProps> = ({ themeMode, setThemeMode, themeName, setThemeName }) => (
  <header className="bg-surface/80 p-4 border-b border-border-default sticky top-0 z-10 shadow-lg backdrop-blur-sm">
    <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'rgb(var(--color-primary-start))'}} />
                        <stop offset="100%" style={{stopColor: 'rgb(var(--color-primary-end))'}} />
                    </linearGradient>
                </defs>
                <path d="M6.5 15.25L2 12L6.5 8.75" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M17.5 15.25L22 12L17.5 8.75" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M14.5 5.75L9.5 18.25" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
            <h1 className="text-xl md:text-2xl font-bold text-primary">
                Apna Code Reviewer
            </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
            <Timer />
            <ThemeSelector 
                themeName={themeName} 
                setThemeName={setThemeName} 
            />
            <ThemeModeToggle
                themeMode={themeMode}
                setThemeMode={setThemeMode}
            />
        </div>
    </div>
  </header>
);