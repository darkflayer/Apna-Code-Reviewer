import React, { useState } from 'react';
import { ReviewResult } from '../types';
import { ReviewFeedback } from './ReviewFeedback';
import { ExecutionOutput } from './ExecutionOutput';
import { NotesCanvas } from './NotesCanvas';

interface RightPanelProps {
    reviewResult: ReviewResult | null;
    isLoading: boolean;
    isExecuting: boolean;
    error: string | null;
    executionOutput: string;
    language: string;
    notes: string;
    setNotes: (notes: string) => void;
}

type Tab = 'review' | 'output' | 'notes';

export const RightPanel: React.FC<RightPanelProps> = (props) => {
    const [activeTab, setActiveTab] = useState<Tab>('review');

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'review':
                return <ReviewFeedback reviewResult={props.reviewResult} isLoading={props.isLoading} error={props.error} />;
            case 'output':
                return <ExecutionOutput output={props.executionOutput} isExecuting={props.isExecuting} />;
            case 'notes':
                return <NotesCanvas notes={props.notes} setNotes={props.setNotes} />;
            default:
                return null;
        }
    };
    
    const TabButton: React.FC<{tab: Tab, label: string}> = ({ tab, label }) => {
        const isActive = activeTab === tab;
        return (
            <button
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-semibold transition-colors relative ${
                    isActive
                        ? 'text-primary'
                        : 'text-secondary hover:text-primary'
                }`}
            >
                {label}
                {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-start to-primary-end rounded-full" />}
            </button>
        )
    }

    return (
        <div className="bg-surface/80 rounded-2xl shadow-xl border border-border-default h-full flex flex-col backdrop-blur-sm">
            <div className="flex-shrink-0 border-b border-border-default">
                <nav className="flex items-center gap-2 px-4 md:px-6">
                    <TabButton tab="review" label="Feedback" />
                    <TabButton tab="output" label="Output" />
                    <TabButton tab="notes" label="Notes" />
                </nav>
            </div>
            <div className="flex-grow overflow-y-auto p-4 md:p-6 custom-scrollbar">
                {renderActiveTab()}
            </div>
        </div>
    );
};