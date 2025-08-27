import React from 'react';

interface NotesCanvasProps {
    notes: string;
    setNotes: (notes: string) => void;
}

export const NotesCanvas: React.FC<NotesCanvasProps> = ({ notes, setNotes }) => {

    const handleDownload = () => {
        const blob = new Blob([notes], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'code-notes.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-primary">Your Notes</h3>
                <button
                    onClick={handleDownload}
                    disabled={!notes}
                    className="px-4 py-2 rounded-md bg-btn-secondary-bg border border-border-default text-secondary font-medium hover:bg-btn-secondary-hover-bg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                >
                    Download Notes
                </button>
            </div>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Jot down your thoughts, to-do lists, or anything related to your code..."
                className="flex-grow w-full p-4 bg-background text-primary font-mono text-sm resize-none focus:outline-none rounded-lg border border-border-default focus:ring-2 focus:ring-primary-end custom-scrollbar"
                spellCheck="false"
            />
        </div>
    );
};