export enum ThemeType {
  system = 'system',
  dark = 'dark',
  light = 'light'
}

export type ThemeSwitchEvent = {
  isDarkMode: boolean;
};

export type ThemeState = {
  isDarkMode: boolean;
  themeType: ThemeType;
};
