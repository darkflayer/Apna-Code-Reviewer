import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { reviewCode, executeCode } from './services/geminiService';
import { ReviewResult } from './types';
import { SUPPORTED_LANGUAGES } from './constants';
import { RightPanel } from './components/RightPanel';
import { themes, ThemeName, generateThemeCSS } from './themes';

type ThemeMode = 'light' | 'dark';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(SUPPORTED_LANGUAGES[0].value);
  const [reviewResult, setReviewResult] = useState<ReviewResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [themeName, setThemeName] = useState<ThemeName>('default');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [executionOutput, setExecutionOutput] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    const savedThemeName = localStorage.getItem('themeName') as ThemeName | null;
    const savedThemeMode = localStorage.getItem('themeMode') as ThemeMode | null;
    const savedNotes = localStorage.getItem('notes');

    setThemeName(savedThemeName || 'default');
    
    if (savedThemeMode) {
      setThemeMode(savedThemeMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeMode('dark');
    }
    
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);
  
  useEffect(() => {
    const theme = themes[themeName]?.[themeMode];
    if (theme) {
      const css = generateThemeCSS(theme);
      let styleTag = document.getElementById('dynamic-theme-styles');
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'dynamic-theme-styles';
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = `:root { ${css} }`;

      if (themeMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      localStorage.setItem('themeName', themeName);
      localStorage.setItem('themeMode', themeMode);
    }
  }, [themeName, themeMode]);

  useEffect(() => {
    localStorage.setItem('notes', notes);
  }, [notes]);


  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setReviewResult(null);
    setExecutionOutput('');

    try {
      const result = await reviewCode(code, language);
      setReviewResult(result);
    } catch (err) {
      console.error(err);
      setError('An error occurred while reviewing the code. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  const handleRunCode = async () => {
    if (!code.trim()) {
        setExecutionOutput('There is no code to run.');
        return;
    }
    setIsExecuting(true);
    setError(null);
    setReviewResult(null);
    setExecutionOutput('');

    try {
        const result = await executeCode(code, language);
        setExecutionOutput(result);
    } catch (err) {
        console.error(err);
        setExecutionOutput('An error occurred while trying to execute the code. Please try again.');
    } finally {
        setIsExecuting(false);
    }
  };
  
  const handleClear = () => {
    setCode('');
    setReviewResult(null);
    setError(null);
    setExecutionOutput('');
  };

  return (
    <div className="min-h-screen bg-transparent font-sans flex flex-col">
      <Header 
        themeMode={themeMode} 
        setThemeMode={setThemeMode} 
        themeName={themeName}
        setThemeName={setThemeName}
      />
      <main className="container mx-auto p-4 md:p-6 lg:p-8 flex-grow flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-3/5 flex flex-col h-[75vh]">
            <CodeInput
                code={code}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
                onReview={handleReview}
                onRun={handleRunCode}
                onClear={handleClear}
                isLoading={isLoading}
                isExecuting={isExecuting}
            />
        </div>
        <div className="w-full lg:w-2/5 flex flex-col h-[75vh]">
          <RightPanel
            reviewResult={reviewResult}
            isLoading={isLoading}
            isExecuting={isExecuting}
            error={error}
            executionOutput={executionOutput}
            language={language}
            notes={notes}
            setNotes={setNotes}
          />
        </div>
      </main>
    </div>
  );
};

export default App;