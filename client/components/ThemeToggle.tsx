import React from 'react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
