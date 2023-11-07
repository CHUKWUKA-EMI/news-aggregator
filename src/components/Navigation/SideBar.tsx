import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';
import MenuIcon from '../../icons/MenuIcon';
import { ThemeState } from '../../types/theme';
import Logo from './Logo';
import useComponentOutsideClick from '../Hooks/useComponentOutsideClick';
import { useAppSelector } from '../../state/hooks';
import { TCustomizedNewsFeedData, TSource } from '../../types/newsSources';
import { CUSTOMIZED_FEED_STORAGE_KEY } from '../../utils/constants';
import BaseInput from '../TextField/BaseInput';

interface ISideBarProps {
  hidden: boolean;
  setSideBarHidden: Dispatch<SetStateAction<boolean>>;
  theme: ThemeState;
}
const SideBar: FC<ISideBarProps> = ({ hidden, setSideBarHidden, theme }) => {
  const sideBarRef = useRef<HTMLDivElement>(null);
  useComponentOutsideClick(sideBarRef, handleClickingOutsideSideBar);

  const categories = useAppSelector((state) => state.articles.categoriesData);
  const [selectedCategoryTabs, setSelectedCategoryTabs] = useState<
    { index: number; name: string }[]
  >([]);

  const [selectedSourcesTabs, setSelectedSourcesTabs] = useState<
    { id: string; name: string }[]
  >([]);
  const [feedName, setFeedName] = useState('');
  const [customizedNewsFeedData, setCustomizedNewsFeedData] =
    useState<TCustomizedNewsFeedData | null>(null);

  function handleClickingOutsideSideBar(evt: MouseEvent) {
    const target = evt.target as HTMLElement;
    if (target.id === 'menuButton') {
      return;
    } else {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(evt.target as HTMLElement) &&
        !hidden
      ) {
        setSideBarHidden(true);
      }
    }
  }

  const getSourcesFromSelectedCategories = () => {
    let sources: TSource[] = [];
    selectedCategoryTabs.forEach((category) => {
      if (categories[category.name]) {
        sources = sources.concat(categories[category.name]);
      }
    });
    return sources;
  };

  const handleCategorySelection = (index: number, categoryName: string) => {
    // if category is selected already, another click de-selects it
    if (selectedCategoryTabs.map((catg) => catg.index).includes(index)) {
      const filteredCategories = selectedCategoryTabs.filter(
        (catg) => catg.index !== index
      );
      setSelectedCategoryTabs(filteredCategories);
    } else {
      setSelectedCategoryTabs([
        ...selectedCategoryTabs,
        { index, name: categoryName }
      ]);
    }
  };

  const handleSourceSelection = (source: TSource) => {
    // if source is selected already, another click de-selects it
    if (selectedSourcesTabs.map((src) => src.id).includes(source.id)) {
      const filteredSources = selectedSourcesTabs.filter(
        (src) => src.id !== source.id
      );
      setSelectedSourcesTabs(filteredSources);
    } else {
      setSelectedSourcesTabs([...selectedSourcesTabs, source]);
    }
  };

  const saveChangesToLocalStorage = () => {
    let feedData: TCustomizedNewsFeedData = {
      feedName,
      categories: [],
      sources: []
    };
    if (selectedCategoryTabs.length) {
      feedData['categories'] = selectedCategoryTabs;
    }

    if (selectedSourcesTabs.length) {
      feedData['sources'] = selectedSourcesTabs;
    }

    localStorage.setItem(CUSTOMIZED_FEED_STORAGE_KEY, JSON.stringify(feedData));
    setCustomizedNewsFeedData(feedData);
    setFeedName('');
    window.location.reload();
  };

  useEffect(() => {
    const storedNewsFeedData = localStorage.getItem(
      CUSTOMIZED_FEED_STORAGE_KEY
    );
    if (storedNewsFeedData) {
      setCustomizedNewsFeedData(JSON.parse(storedNewsFeedData));
    }
  }, []);

  return (
    <div
      ref={sideBarRef}
      className={`h-full shadow-md shadow-gray-700 dark:shadow-gray-900 fixed left-0 bottom-0 w-[60%] sm:w-[50%] md:w-1/3 z-[15] slide-in ${
        hidden ? 'hidden slide-out' : 'slide-in'
      } bg-gray-100 dark:bg-gray-800 px-4 py-2`}
    >
      <div className="flex items-center gap-8 text-gray-400">
        <button
          onClick={() => setSideBarHidden(true)}
          className="rounded-full p-1 dark:hover:bg-gray-600 hover:bg-gray-300 text-gray-900 dark:text-white dark:hover:text-white"
        >
          <MenuIcon
            strokeWidth={theme.isDarkMode ? 1 : 1.5}
            className="w-8 h-8 outline-none border-none"
          />
        </button>
        <Logo className="" />
      </div>
      <div className="sm:h-[3rem] h-4"></div>
      <div className="text-left">
        <span className="text-gray-400 tracking-[2px] text-center">FEEDS</span>
        {customizedNewsFeedData !== null &&
          Object.keys(customizedNewsFeedData).length > 0 && (
            <div className="py-2">
              <p className="flex items-center ring-1 ring-gray-600 p-1 rounded-md justify-between">
                <span className="text-green-500 capitalize font-bold">
                  {customizedNewsFeedData.feedName}
                </span>{' '}
                <button
                  onClick={() => {
                    localStorage.removeItem(CUSTOMIZED_FEED_STORAGE_KEY);
                    setCustomizedNewsFeedData(null);
                  }}
                  className="text-white px-2 py-1 rounded-md text-sm bg-red-500"
                >
                  Delete
                </button>
              </p>
            </div>
          )}
        <p className="mt-2 font-semibold text-xl dark:text-white tracking-[1.5px]">
          Customize your news feed
        </p>
        <div className="w-full flex flex-col gap-3 items-center border-t-2 border-t-gray-400 mt-2 pt-4">
          <BaseInput
            value={feedName}
            onChange={(e) => setFeedName(e.target.value)}
            placeholder="Custom feed's name"
            className="outline-none placeholder:text-sm w-[80%] ring-1 bg-inherit ring-green-500 p-2 dark:text-white text-gray-900 dark:placeholder:text-gray-300 placeholder:text-gray-900 rounded-md"
          />
          <button
            type="button"
            onClick={saveChangesToLocalStorage}
            disabled={
              (!selectedCategoryTabs.length && !selectedSourcesTabs.length) ||
              !feedName
            }
            className="bg-green-700 disabled:bg-gray-400 disabled:text-black shadow-md shadow-gray-950 flex items-center justify-center font-bold w-14 h-14 fixed bottom-4 right-2 z-20 text-xs hover:bg-green-600 mx-auto text-white p-4 rounded-[100%]"
          >
            Save
          </button>
        </div>
        <div className="w-full pt-4">
          <span className="text-gray-500 dark:text-gray-400 font-semibold">
            Set your preferred categories
          </span>
          <div className="w-full flex h-[4rem] overflow-x-auto items-center gap-2">
            {(Object.keys(categories) as Array<keyof typeof categories>).map(
              (categoryName, index) => (
                <button
                  onClick={() =>
                    handleCategorySelection(index, categoryName as string)
                  }
                  key={index}
                  className={`text-xs rounded-lg whitespace-nowrap ${
                    selectedCategoryTabs.map((c) => c.index).includes(index)
                      ? 'dark:bg-white bg-gray-900 text-white dark:text-gray-900'
                      : 'dark:bg-gray-500 bg-gray-300 text-gray-800 dark:text-white'
                  } py-2 px-3 font-medium w-fit`}
                >
                  {categoryName}
                </button>
              )
            )}
          </div>
          {getSourcesFromSelectedCategories().length > 0 && (
            <>
              <p className="text-gray-500 my-2 dark:text-gray-400 font-semibold">
                Select your preferred sources
              </p>
              <div className="w-full flex flex-wrap h-[8rem] overflow-y-auto items-center gap-4">
                {getSourcesFromSelectedCategories().map((source) => (
                  <button
                    onClick={() => handleSourceSelection(source)}
                    key={source.id}
                    className={`text-xs rounded-lg whitespace-nowrap ${
                      selectedSourcesTabs.map((s) => s.id).includes(source.id)
                        ? 'dark:bg-white bg-gray-900 text-white dark:text-gray-900'
                        : 'dark:bg-gray-500 bg-gray-300 text-gray-800 dark:text-white'
                    } py-2 px-3 font-medium w-fit`}
                  >
                    {source.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
