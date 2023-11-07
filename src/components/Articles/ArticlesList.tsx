import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import Article from './Article';
import useIntersectionObserver from '../Hooks/useIntersectionObserver';
import { _getArticles } from '../../services';
import {
  addArticles,
  setSearchQueryParams
} from '../../state/reducers/articlesReducer';
import Loader from '../shared/Loader';

const ArticlesList = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state) => state.articles.articles);
  const loading = useAppSelector((state) => state.articles.loading);
  const { page, ...restParams } = useAppSelector(
    (state) => state.articles.articlesSearchQueryParams
  );

  const infiniteScrollTriggerRef = useRef<HTMLButtonElement>(null);
  const { isTargetIntersecting } = useIntersectionObserver(
    infiniteScrollTriggerRef
  );

  useEffect(() => {
    if (isTargetIntersecting) {
      (async () => {
        const currentPage = page ? page + 1 : 1;
        const response = await _getArticles({
          page: currentPage,
          ...restParams
        });
        if (response.success && response.articles) {
          dispatch(addArticles(response.articles));
          dispatch(setSearchQueryParams({ page: currentPage }));
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTargetIntersecting, dispatch]);

  if (loading) {
    return <Loader numberOfSkeletons={4} />;
  }
  return (
    <div className="pt-24 w-full px-8">
      {Object.keys(articles).length ? (
        <div className="flex flex-col w-full lg:w-[80%] mx-auto gap-10">
          {(Object.keys(articles) as Array<keyof typeof articles>).map(
            // Group articles by source
            (source, index) => (
              <div className="w-full py-4 flex flex-col" key={index}>
                {/* For each source, show a list of articles */}
                <p className="font-[700] mb-4 text-xl dark:text-gray-400 text-gray-600">
                  {source}
                </p>
                <div className="w-full flex flex-wrap md:flex-nowrap mx-auto md:flex-col gap-4 sm:gap-6 md:gap-8">
                  {articles[source].map((article, aIndex) => (
                    <Article key={aIndex} {...article} />
                  ))}
                </div>
              </div>
            )
          )}
          <button
            ref={infiniteScrollTriggerRef}
            className="dark:text-white w-fit mx-auto font-bold animate-pulse pb-4"
          >
            Loading...
          </button>
        </div>
      ) : (
        <p className="dark:text-white text-gray-700 text-lg animate-bounce mt-4 font-semibold text-center">
          Articles not found
        </p>
      )}
    </div>
  );
};

export default ArticlesList;
