import { FC, useRef, useState } from 'react';
import DarkIcon from '../icons/DarkIcon';
import LightIcon from '../icons/LightIcon';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { switchThemes } from '../state/reducers/themeReducer';
import PopperElement from './shared/Box';
import { ThemeType } from '../types/theme';
import useComponentOutsideClick from './Hooks/useComponentOutsideClick';
import CustomRadioButton from './shared/CustomRadioButton';

const ThemeController: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const popperRef = useRef<HTMLDivElement>(null);
  useComponentOutsideClick(popperRef, handleClickingOutsidePopper);
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  function handleClickingOutsidePopper(evt: MouseEvent) {
    const target = evt.target as HTMLElement;
    if (target.id === 'toggleButton') {
      return;
    } else {
      if (
        popperRef.current &&
        !popperRef.current.contains(evt.target as HTMLElement) &&
        isPopperOpen
      ) {
        setIsPopperOpen(false);
      }
    }
  }

  const handleThemesSwitch = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    const themeType = target.value as ThemeType;
    dispatch(switchThemes(themeType));
  };

  return (
    <div className="sm:ml-0 ml-1">
      {theme.isDarkMode ? (
        <DarkIcon
          strokeWidth={theme.isDarkMode ? 1 : 1.3}
          id="toggleButton"
          onClick={() => setIsPopperOpen(!isPopperOpen)}
          data-tooltip-id="nav-tooltip"
          data-tooltip-content="Switch Between Themes"
          className="h-8 w-8 cursor-pointer dark:text-white dark:hover:text-white outline-none"
        />
      ) : (
        <LightIcon
          strokeWidth={theme.isDarkMode ? 1 : 1.3}
          id="toggleButton"
          onClick={() => setIsPopperOpen(!isPopperOpen)}
          data-tooltip-id="nav-tooltip"
          data-tooltip-content="Switch Between Themes"
          className="h-8 w-8 cursor-pointer dark:text-white dark:hover:text-white outline-none"
        />
      )}
      <PopperElement
        ref={popperRef}
        className={`absolute shadow-md shadow-gray-700 dark:bg-gray-900 bg-white top-4 right-14 lg:right-[4.5rem] rounded-md ${
          !isPopperOpen ? 'hidden' : ''
        }`}
      >
        <div className="w-6 h-6 absolute bg-inherit rounded-tr-[100%] rounded-br-full -rotate-45 -right-3 top-1/4"></div>
        <div className="py-2 px-2 text-black dark:text-white">
          <CustomRadioButton
            theme={theme}
            buttonId="system"
            value={ThemeType.system}
            label="System"
            onClick={handleThemesSwitch}
          />
          <CustomRadioButton
            theme={theme}
            buttonId="light"
            value={ThemeType.light}
            label="Light"
            onClick={handleThemesSwitch}
          />
          <CustomRadioButton
            theme={theme}
            buttonId="dark"
            value={ThemeType.dark}
            label="Dark"
            onClick={handleThemesSwitch}
          />
        </div>
      </PopperElement>
      <div></div>
    </div>
  );
};

export default ThemeController;
