import React from 'react';
import { ReviewResult, FeedbackPoint } from '../types';
import { AlertTriangleIcon, CheckCircleIcon, InfoIcon, SparklesIcon, CopyIcon } from './icons/SeverityIcons';

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-6 animate-pulse">
        <div className="h-6 bg-border-default/50 rounded-md w-1/3"></div>
        <div className="h-10 bg-border-default/50 rounded-md w-full"></div>
        <div className="h-6 bg-border-default/50 rounded-md w-1/3"></div>
        <div className="h-24 bg-border-default/50 rounded-lg w-full"></div>
        <div className="h-24 bg-border-default/50 rounded-lg w-full"></div>
        <div className="h-6 bg-border-default/50 rounded-md w-1/3"></div>
        <div className="h-32 bg-border-default/50 rounded-lg w-full"></div>
    </div>
);

const FeedbackPointCard: React.FC<{ point: FeedbackPoint; type: 'error' | 'suggestion' }> = ({ point, type }) => {
    const isError = type === 'error';
    const borderColor = isError ? 'border-severity-critical' : 'border-severity-suggestion';
    const textColor = isError ? 'text-severity-critical' : 'text-severity-suggestion';

    return (
        <div className={`rounded-lg border ${borderColor} bg-background/50 overflow-hidden border-l-4`}>
            <div className={`p-3 flex items-center gap-3 border-b ${borderColor} bg-surface/30`}>
                <div className={textColor}>
                    {isError ? <AlertTriangleIcon /> : <InfoIcon />}
                </div>
                <h4 className={`font-semibold text-primary`}>
                    {isError ? 'Error' : 'Suggestion'} {point.line && point.line > 0 ? `(Line ${point.line})` : '(General)'}
                </h4>
            </div>
            <p className="text-secondary p-4 text-sm font-mono whitespace-pre-wrap">{point.comment}</p>
        </div>
    );
};

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    const [copySuccess, setCopySuccess] = React.useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    return (
        <div className="bg-background rounded-lg border border-border-default relative">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 rounded-md bg-surface/80 hover:bg-btn-secondary-hover-bg transition-colors"
                title="Copy code"
            >
                {copySuccess ? <CheckCircleIcon className="h-5 w-5 text-severity-suggestion" /> : <CopyIcon className="h-5 w-5 text-secondary" />}
            </button>
            <pre className="p-4 text-sm font-mono text-secondary overflow-x-auto custom-scrollbar">
                <code>{code}</code>
            </pre>
        </div>
    );
};

const Section: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => (
    <details className="group" open={defaultOpen}>
        <summary className="text-lg font-semibold text-primary list-none cursor-pointer flex items-center gap-2">
            <span className="transition-transform duration-200 group-open:rotate-90 text-transparent bg-clip-text bg-gradient-to-r from-primary-start to-primary-end">▶</span> {title}
        </summary>
        <div className="mt-4 pl-6 border-l-2 border-border-default">
            {children}
        </div>
    </details>
);


export const ReviewFeedback: React.FC<{ reviewResult: ReviewResult | null; isLoading: boolean; error: string | null }> = ({ reviewResult, isLoading, error }) => {
    if (isLoading) return <LoadingSkeleton />;
    if (error) {
        return (
            <div className="text-center p-8 bg-severity-critical/10 border border-severity-critical rounded-lg">
                <AlertTriangleIcon className="mx-auto h-12 w-12 text-severity-critical mb-4" />
                <h3 className="text-lg font-semibold text-primary">An Error Occurred</h3>
                <p className="text-secondary">{error}</p>
            </div>
        );
    }
    if (reviewResult) {
        const hasFeedback = reviewResult.errors.length > 0 || reviewResult.suggestions.length > 0;
        return (
            <div className="opacity-0 animate-fade-in space-y-8" style={{ animationFillMode: 'forwards' }}>
                <Section title="Program Summary">
                    <p className="text-secondary italic">{reviewResult.programDescription}</p>
                </Section>

                {!hasFeedback && (
                    <div className="text-center p-8 bg-severity-suggestion/10 border border-severity-suggestion rounded-lg">
                        <CheckCircleIcon className="mx-auto h-12 w-12 text-severity-suggestion mb-4" />
                        <h3 className="text-lg font-semibold text-primary">Excellent Code!</h3>
                        <p className="text-secondary">The AI reviewer found no errors or suggestions.</p>
                    </div>
                )}

                {reviewResult.errors.length > 0 && (
                    <Section title="Errors">
                        <div className="space-y-4">
                            {reviewResult.errors.map((err, i) => <FeedbackPointCard key={`err-${i}`} point={err} type="error" />)}
                        </div>
                    </Section>
                )}

                {reviewResult.suggestions.length > 0 && (
                    <Section title="Suggestions">
                        <div className="space-y-4">
                            {reviewResult.suggestions.map((sug, i) => <FeedbackPointCard key={`sug-${i}`} point={sug} type="suggestion" />)}
                        </div>
                    </Section>
                )}
                
                <Section title="Correct Approach">
                    <p className="text-secondary whitespace-pre-wrap">{reviewResult.correctApproach}</p>
                </Section>
                
                <Section title="Updated Code">
                    <CodeBlock code={reviewResult.updatedCode} />
                </Section>
            </div>
        );
    }
    return (
        <div className="text-center p-8 text-secondary flex flex-col items-center justify-center h-full">
            <SparklesIcon className="mx-auto h-16 w-16 text-primary-start mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-primary">Awaiting Review</h3>
            <p className="max-w-xs">Enter your code on the left and click "Review Code" to get instant feedback from our AI assistant.</p>
        </div>
    );
};