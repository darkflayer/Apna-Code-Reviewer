import React, { useState, useRef, useEffect } from 'react';
import { PaletteIcon } from './icons/SeverityIcons';
import { themes, ThemeName } from '../themes';

interface ThemeSelectorProps {
    themeName: ThemeName;
    setThemeName: (name: ThemeName) => void;
}

const themeNames = Object.keys(themes) as ThemeName[];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themeName, setThemeName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleThemeChange = (name: ThemeName) => {
      setThemeName(name);
      setIsOpen(false);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 bg-btn-secondary-bg hover:bg-btn-secondary-hover-bg border border-border-default transition-colors text-sm font-medium text-secondary hover:text-primary"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <PaletteIcon className="h-5 w-5" />
                <span className="capitalize hidden sm:inline">{themeName}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border-default rounded-lg shadow-2xl p-2 z-20 animate-fade-in" style={{animationDuration: '0.2s'}}>
                    <p className="text-xs font-semibold text-secondary px-2 py-1">THEME</p>
                    {themeNames.map(name => (
                        <button
                            key={name}
                            onClick={() => handleThemeChange(name)}
                            className={`w-full text-left px-2 py-1.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors ${
                                themeName === name ? 'bg-primary-start/10 text-primary' : 'hover:bg-btn-secondary-hover-bg text-secondary'
                            }`}
                        >
                          <div 
                              className="h-4 w-4 rounded-full border border-border-default" 
                              style={{ background: `linear-gradient(45deg, ${themes[name].light.colors['primary-start']}, ${themes[name].light.colors['primary-end']})` }}
                          />
                          <span className="capitalize">{name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};