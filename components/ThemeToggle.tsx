import React from 'react';
import { useTheme } from '../lib/theme';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);
  };

  const label =
    theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻';

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label={`Current theme: ${theme}. Click to change.`}
      title={`Theme: ${theme}`}
    >
      <span className="text-xl" role="img" aria-hidden="true">
        {label}
      </span>
    </button>
  );
};

export default ThemeToggle;
