import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import ScrollArrowIcon from '../../icons/ScrollArrowIcon';
import useIntersectionObserver from '../Hooks/useIntersectionObserver';
import DateRangePicker from '../shared/DateRangePicker';
import Dropdown from '../shared/Dropdown';
import {
  setSearchQueryParams,
  setSelectedCategory
} from '../../state/reducers/articlesReducer';
import { TSource } from '../../types/newsSources';
import { formatDate } from '../../utils/helpers';

const SourceFilterTabs = () => {
  const dispatch = useAppDispatch();
  const sources = useAppSelector((state) => state.articles.selectedCategory);
  const categories = useAppSelector((state) => state.articles.categoriesData);
  const [category, setCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const lastTabRef = useRef<HTMLButtonElement>(null);
  const firstTabRef = useRef<HTMLButtonElement>(null);

  const { isTargetIntersecting: isLastTabVisible } = useIntersectionObserver(
    lastTabRef,
    tabsContainerRef
  );
  const { isTargetIntersecting: isFirstTabVisible } = useIntersectionObserver(
    firstTabRef,
    tabsContainerRef
  );

  const [start_date, setStartDate] = useState<Date | null>(null);
  const [end_date, setEndDate] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (category) {
      dispatch(setSelectedCategory(category.name));
    }
  }, [category, dispatch]);

  const handleForwardScroll = () => {
    lastTabRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollBack = () => {
    firstTabRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const onCalendarClose = () => {
    if (start_date && end_date) {
      dispatch(
        setSearchQueryParams({
          startDate: formatDate(start_date),
          endDate: formatDate(end_date)
        })
      );
    }
  };

  const handleSourceSelection = (index: number, source?: TSource) => {
    setActiveTab(index);
    if (index === 0 && !source) {
      dispatch(
        setSearchQueryParams({
          page: 1,
          pageSize: 30,
          source: sources
            ?.slice(0, 11)
            .map((src) => src.name)
            .join(','),
          sourceId: sources
            ?.slice(0, 11)
            .map((src) => src.id)
            .join(',')
        })
      );
      return setActiveTab(index);
    }

    if (index > 0 && source) {
      dispatch(
        setSearchQueryParams({
          page: 1,
          pageSize: 30,
          source: source.name,
          sourceId: source.id
        })
      );
      return setActiveTab(index);
    }
  };

  return Array.isArray(sources) && sources.length ? (
    <div className="fixed w-full py-2 dark:bg-gray-900 bg-white opacity-100 left-0 right-0 px-4">
      <div className="flex items-center justify-between sm:justify-evenly gap-4 sm:gap-8 mb-4 sm:mb-2">
        <DateRangePicker
          endDate={end_date}
          startDate={start_date}
          onChange={handleDateChange}
          onCalendarClose={onCalendarClose}
        />
        <Dropdown
          defaultText="Categories"
          items={(
            Object.keys(categories) as Array<keyof typeof categories>
          ).map((category, index) => ({
            id: index.toString(),
            name: String(category)
          }))}
          onSelect={setCategory}
          selectedItem={category}
        />
      </div>
      <div
        ref={tabsContainerRef}
        className={`static ${
          sources.length < 5 ? 'sm:w-fit sm:mx-auto' : 'w-full px-8'
        } flex items-center gap-3 overflow-x-auto no-scrollbar`}
      >
        <button
          onClick={handleScrollBack}
          className={`dark:bg-gray-900 absolute left-3 outline-none border-none bg-white text-gray-900 dark:text-white opacity-100 p-2 rounded-sm hover:rounded-full dark:hover:bg-gray-800 ${
            isFirstTabVisible ? 'hidden' : ''
          }`}
        >
          <ScrollArrowIcon
            className="w-6 h-6 outline-none border-none"
            arrowDirection="left"
            data-tooltip-id="nav-tooltip"
            data-tooltip-content="Previous"
          />
        </button>

        <button
          ref={firstTabRef}
          onClick={() => handleSourceSelection(0)}
          className={`text-sm rounded-lg ${
            activeTab === 0
              ? 'dark:bg-white text-white bg-gray-900 dark:text-gray-900'
              : 'dark:bg-gray-800 bg-gray-300 text-gray-800 dark:text-white'
          } py-2 px-3 font-bold w-fit`}
        >
          All
        </button>

        {sources.map((source, index) => (
          <button
            ref={sources.length - 1 === index ? lastTabRef : null}
            onClick={() => handleSourceSelection(index + 1, source)}
            key={source.id}
            className={`text-sm rounded-lg whitespace-nowrap ${
              activeTab === index + 1
                ? 'dark:bg-white bg-gray-900 text-white dark:text-gray-900'
                : 'dark:bg-gray-800 bg-gray-300 text-gray-800 dark:text-white'
            } py-2 px-3 font-bold w-fit`}
          >
            {source.name}
          </button>
        ))}

        <button
          onClick={handleForwardScroll}
          className={`dark:bg-gray-900 absolute right-3 outline-none border-none bg-white text-gray-900 dark:text-white opacity-100 p-2 rounded-sm hover:rounded-full dark:hover:bg-gray-800 ${
            isLastTabVisible ? 'hidden' : 'block'
          }`}
        >
          <ScrollArrowIcon
            className="w-6 h-6 outline-none border-none"
            arrowDirection="right"
            data-tooltip-id="nav-tooltip"
            data-tooltip-content="Next"
          />
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default SourceFilterTabs;
