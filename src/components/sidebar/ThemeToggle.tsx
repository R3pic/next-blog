'use client';
import { useTheme } from 'next-themes';
import Icon from '../ui/Icon';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const onClick = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className={`w-10 h-10 rounded-full
    bg-yellow-400
    flex items-center justify-center
    hover:animate-pulse-scale
    hover:bg-yellow-500
    hover:border-light-foreground
    hover:border-2
    `}
      onClick={onClick}
    >
      <Icon
        className={`absolute 
        stroke-light-foreground fill-light-foreground
        transition-all duration-300
        opacity-0
        dark:opacity-100
        `}
        icon='moon'
      />
      <Icon
        className={`absolute 
        stroke-light-foreground fill-light-foreground
        transition-all duration-300
        opacity-100
        dark:opacity-0
        `}
        icon='sun'
      />
    </button>
  );
}