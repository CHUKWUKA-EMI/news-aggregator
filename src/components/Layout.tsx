import { useEffect } from 'react';
import TopBar from './Navigation/TopBar';
import { Outlet } from 'react-router-dom';
import { _getArticles, _getSources } from '../services';
import {
  TCustomizedNewsFeedData,
  TSourcesRequestResponse
} from '../types/newsSources';
import { formatSourcesData } from '../utils/helpers';
import { useAppDispatch } from '../state/hooks';
import { setArticles, setCategories } from '../state/reducers/articlesReducer';
import { CUSTOMIZED_FEED_STORAGE_KEY } from '../utils/constants';

const Layout = () => {
  const dispatch = useAppDispatch();

  //Use customized news feed metadata, if exists, to fetch articles
  useEffect(() => {
    const localData = localStorage.getItem(CUSTOMIZED_FEED_STORAGE_KEY);
    if (localData) {
      const customizedNewsFeedData = JSON.parse(
        localData
      ) as TCustomizedNewsFeedData;
      (async () => {
        const sourceIds = customizedNewsFeedData.sources
          .map((src) => src.id)
          .join(',');
        const sourceNames = customizedNewsFeedData.sources
          .map((src) => src.name)
          .join(',');
        const response = await _getArticles({
          source: sourceNames,
          sourceId: sourceIds
        });
        if (response.success && response.articles) {
          dispatch(setArticles(response.articles));
        }
      })();
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const response = await _getSources();
      if (response.status === 200 && response.data.status === 'ok') {
        const data = response.data.sources as TSourcesRequestResponse[];
        const categoriesData = formatSourcesData(data);

        dispatch(setCategories(categoriesData));
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    const localData = localStorage.getItem(CUSTOMIZED_FEED_STORAGE_KEY);
    if (localData) return;
    (async () => {
      const response = await _getArticles({});
      if (response.success && response.articles) {
        dispatch(setArticles(response.articles));
      }
    })();
  }, [dispatch]);

  return (
    <div className="h-screen w-screen dark:bg-gray-900">
      <TopBar />
      <hr className="sm:h-[4.4rem] h-[4.1rem]" />
      <main className="w-full bg-inherit sm:px-8 sm:mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
