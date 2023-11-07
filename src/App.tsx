import { useEffect } from 'react';
import Layout from './components/Layout';
import { useAppDispatch } from './state/hooks';
import { ThemeType } from './types/theme';
import { switchThemes } from './state/reducers/themeReducer';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!('theme' in localStorage)) {
      dispatch(switchThemes(ThemeType.system));
    } else {
      if (localStorage.theme === 'dark') {
        dispatch(switchThemes(ThemeType.dark));
      } else {
        dispatch(switchThemes(ThemeType.light));
      }
    }
  }, [dispatch]);

  return <Layout />;
}

export default App;
