import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import ArticlesList from './ArticlesList';
import SourceFilterTabs from './SourceFilterTabs';
import { _getArticles } from '../../services';
import {
  setArticles,
  setLoadingState
} from '../../state/reducers/articlesReducer';

const NewsFeed = () => {
  const dispatch = useAppDispatch();
  const { page, pageSize, ...restParams } = useAppSelector(
    (state) => state.articles.articlesSearchQueryParams
  );

  useEffect(() => {
    (async () => {
      dispatch(setLoadingState(true));
      const response = await _getArticles({
        ...restParams
      });
      if (response.success && response.articles) {
        dispatch(setArticles(response.articles));
        dispatch(setLoadingState(false));
      }
    })();
  }, [dispatch, restParams]);

  return (
    <div className="w-full overflow-x-hidden">
      <SourceFilterTabs />
      <ArticlesList key="articleslist" />
    </div>
  );
};

export default NewsFeed;
