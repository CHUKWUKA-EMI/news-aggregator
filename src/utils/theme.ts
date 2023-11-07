import { ThemeType } from '../types/theme';

export const switchToSystemTheme = () => {
  localStorage.removeItem('theme');
  const isSystemSetToDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (isSystemSetToDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    isSystemSetToDarkMode
  };
};

export const switchToDarkMode = (theme: ThemeType) => {
  localStorage.setItem('theme', theme);
  document.documentElement.classList.add('dark');
};

export const switchToLightMode = (theme: ThemeType) => {
  localStorage.setItem('theme', theme);
  document.documentElement.classList.remove('dark');
};
