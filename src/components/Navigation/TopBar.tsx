import { FC, FormEvent, useState } from 'react';
import SearchInput from '../TextField/SearchInput';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import MenuIcon from '../../icons/MenuIcon';
import Logo from './Logo';
import SideBar from './SideBar';
import ThemeController from '../ThemeController';
import { setSearchQueryParams } from '../../state/reducers/articlesReducer';

const TopBar: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const [sideBarHidden, setSideBarHidden] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue) {
      dispatch(setSearchQueryParams({ queryKeyWord: searchValue }));
      setSearchValue('');
    }
  };

  return (
    <nav
      className={`z-10 opacity-100 flex items-center bg-white dark:bg-gray-900 border-b-[0.5px] border-gray-600 fixed top-0 left-0 right-0 px-4 py-1`}
    >
      <SideBar
        setSideBarHidden={setSideBarHidden}
        theme={theme}
        hidden={sideBarHidden}
      />
      <div className="flex items-center gap-4 sm:gap-8 text-gray-400 w-fit">
        <button
          id="menuButton"
          onClick={() => setSideBarHidden(!sideBarHidden)}
          className="rounded-full p-1 dark:hover:bg-gray-600 hover:bg-gray-300 text-gray-900 dark:text-white dark:hover:text-white"
        >
          <MenuIcon
            strokeWidth={theme.isDarkMode ? 1 : 1.5}
            className="w-8 h-8 outline-none border-none"
          />
        </button>
        <Logo className="hidden sm:flex" />
      </div>
      <form onSubmit={handleSearch} className="sm:w-[50%] w-[100%] mx-auto">
        <SearchInput
          inputWrapperClassName=""
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      <ThemeController />
    </nav>
  );
};

export default TopBar;
