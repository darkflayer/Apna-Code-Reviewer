import React, { useRef, useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { Spinner } from './Spinner';
import { CopyIcon, PlayIcon } from './icons/SeverityIcons';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onReview: () => void;
  onRun: () => void;
  onClear: () => void;
  isLoading: boolean;
  isExecuting: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  code,
  setCode,
  language,
  setLanguage,
  onReview,
  onRun,
  onClear,
  isLoading,
  isExecuting
}) => {
  const [lineCount, setLineCount] = useState(1);
  const lineCounterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const lines = code.split('\n').length;
    setLineCount(lines > 0 ? lines : 1);
  }, [code]);

  const handleScroll = () => {
    if (lineCounterRef.current && textareaRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const isDisabled = isLoading || isExecuting;

  return (
    <div className="bg-surface/80 rounded-2xl shadow-xl border border-border-default p-4 md:p-6 flex flex-col h-full backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold text-primary">Your Code</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-background/80 border border-border-default text-primary text-sm rounded-lg focus:ring-2 focus:ring-primary-end p-2.5 transition-all w-full sm:w-auto"
          disabled={isDisabled}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-grow w-full bg-background rounded-lg border border-border-default focus-within:ring-2 focus-within:ring-primary-end flex overflow-hidden transition-all">
        <div 
            ref={lineCounterRef}
            className="w-12 text-right pr-2 pt-4 bg-transparent text-secondary font-mono text-sm select-none overflow-y-hidden"
            aria-hidden="true"
        >
            {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
            ))}
        </div>
        <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={handleScroll}
            placeholder={`Paste your ${SUPPORTED_LANGUAGES.find(l => l.value === language)?.label || ''} code here...`}
            className="flex-grow w-full p-4 bg-transparent text-primary font-mono text-sm resize-none focus:outline-none custom-scrollbar"
            spellCheck="false"
            disabled={isDisabled}
        />
      </div>
      <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <div className='flex items-center gap-2 self-start sm:self-center'>
          <button
            onClick={handleCopy}
            disabled={isDisabled || !code}
            className="px-3 py-2 rounded-md bg-btn-secondary-bg border border-border-default text-secondary font-medium hover:bg-btn-secondary-hover-bg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm"
          >
            <CopyIcon className="h-4 w-4" />
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={onClear}
            disabled={isDisabled || !code}
            className="px-3 py-2 rounded-md bg-btn-secondary-bg border border-border-default text-secondary font-medium hover:bg-btn-secondary-hover-bg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
          >
              Clear
          </button>
        </div>
        <div className="flex items-center gap-4 self-stretch sm:self-center">
          <button
            onClick={onRun}
            disabled={isDisabled || !code}
            className="flex-1 sm:flex-none justify-center px-4 py-2 rounded-md bg-btn-secondary-bg text-primary font-semibold hover:bg-btn-secondary-hover-bg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 border border-border-default"
            title="Run Code"
          >
            {isExecuting ? <Spinner isDark={document.documentElement.classList.contains('dark')} /> : <PlayIcon className="h-5 w-5" />}
            {isExecuting ? 'Running...' : 'Run Code'}
          </button>
          <button
            onClick={onReview}
            disabled={isDisabled || !code}
            className="flex-1 sm:flex-none justify-center px-6 py-2 rounded-md bg-gradient-to-r from-primary-start to-primary-end text-white font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg"
          >
            {isLoading ? <Spinner /> : null}
            {isLoading ? 'Reviewing...' : 'Review Code'}
          </button>
        </div>
      </div>
    </div>
  );
};