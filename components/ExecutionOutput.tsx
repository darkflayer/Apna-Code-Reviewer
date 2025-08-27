import React from 'react';
import { Spinner } from './Spinner';

interface ExecutionOutputProps {
    output: string;
    isExecuting: boolean;
}

export const ExecutionOutput: React.FC<ExecutionOutputProps> = ({ output, isExecuting }) => {
    if (isExecuting) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 text-secondary h-full">
                <Spinner isDark={document.documentElement.classList.contains('dark')} />
                <h3 className="text-lg font-semibold text-primary mt-4">Executing Code...</h3>
                <p>The AI is processing your code. Please wait a moment.</p>
            </div>
        );
    }
    
    return (
        <div>
            {output ? (
                <pre className="bg-background text-secondary text-sm font-mono whitespace-pre-wrap p-4 rounded-lg border border-border-default">
                    {output}
                </pre>
            ) : (
                <div className="text-center p-8 text-secondary">
                    <h3 className="text-lg font-semibold text-primary">No Output</h3>
                    <p>
                        Click "Run Code" to execute your code and see the output here.
                    </p>
                </div>
            )}
        </div>
    );
};