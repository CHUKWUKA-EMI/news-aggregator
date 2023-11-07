import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ThemeState, ThemeType } from '../../types/theme';
import { switchToDarkMode, switchToLightMode, switchToSystemTheme } from '../../utils/theme';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: false,
    themeType: ThemeType.system
  } as ThemeState,
  reducers: {
    switchThemes: (state: ThemeState, action: PayloadAction<ThemeType>) => {
      const theme = action.payload;
      switch (theme) {
        case ThemeType.system:
          const { isSystemSetToDarkMode } = switchToSystemTheme();
          state.isDarkMode = isSystemSetToDarkMode;
          state.themeType = theme;
          break;
        case ThemeType.dark:
          switchToDarkMode(theme);
          state.isDarkMode = true;
          state.themeType = theme;
          break;
        case ThemeType.light:
          switchToLightMode(theme);
          state.isDarkMode = false;
          state.themeType = theme;
          break;
        default:
          break;
      }
    }
  }
});
export const { switchThemes } = themeSlice.actions;
export default themeSlice.reducer;
