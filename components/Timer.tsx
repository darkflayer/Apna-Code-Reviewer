import React, { useState, useEffect, useRef } from 'react';
import { TimerIcon } from './icons/SeverityIcons';

export const Timer: React.FC = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return [hours, minutes, seconds]
            .map(v => v.toString().padStart(2, '0'))
            .join(':');
    };

    return (
        <div className="flex items-center gap-2 text-sm text-secondary font-mono">
            <TimerIcon className="h-5 w-5" />
            <span>{formatTime(time)}</span>
            <button
                onClick={handleStartStop}
                className="px-2 py-1 rounded bg-btn-secondary-bg hover:bg-btn-secondary-hover-bg text-xs font-sans font-medium text-primary"
            >
                {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
                onClick={handleReset}
                className="px-2 py-1 rounded bg-btn-secondary-bg hover:bg-btn-secondary-hover-bg text-xs font-sans font-medium text-primary"
            >
                Reset
            </button>
        </div>
    );
};