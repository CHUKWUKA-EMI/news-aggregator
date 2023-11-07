import {
  TArticle,
  TGetArticlesRequest,
  TSourceArticlesData
} from '../types/newsSources';
import { articlesDataMapper, groupArticlesBySource } from '../utils/helpers';
import {
  newYorkTimesAPiAxiosInstance,
  newsAPiAxiosInstance,
  theGuardianAPiAxiosInstance
} from './config';

export const _getSources = async () => {
  const responsePromise = newsAPiAxiosInstance.get('/top-headlines/sources');
  const response = await responsePromise;
  return response;
};

const _constructNewsApiQuery = ({
  endDate,
  page = 1,
  pageSize = 30,
  queryKeyWord,
  sourceId,
  startDate
}: Partial<TGetArticlesRequest>) => {
  const queryParams = [];

  queryParams.push(`page=${page}`);
  if (queryKeyWord) {
    queryParams.push(`q=${queryKeyWord}`);
  }
  if (pageSize) {
    queryParams.push(`pageSize=${Math.ceil(pageSize / 3)}`);
  } else {
    queryParams.push(`pageSize=10`);
  }

  if (startDate) queryParams.push(`from=${startDate}`);
  if (endDate) queryParams.push(`to=${endDate}`);

  if (sourceId) {
    queryParams.push(`sources=${sourceId}`);
  } else {
    queryParams.push(`sources=bbc-news,axios`);
  }

  return newsAPiAxiosInstance.get(`/everything?${queryParams.join('&')}`);
};

const _constructNewYorkTimesApiQuery = ({
  endDate,
  queryKeyWord,
  source,
  startDate,
  page = 1
}: Partial<TGetArticlesRequest>) => {
  // New York Times API paginates from 0
  if (page) page = page - 1;
  return newYorkTimesAPiAxiosInstance.get(
    `/articlesearch.json?api-key=${
      process.env.REACT_APP_NEW_YORK_TIMES_API_KEY
    }&page=${page}${queryKeyWord ? `&q=${queryKeyWord}` : ''}${
      startDate ? `&begin_date=${startDate}` : ''
    }${endDate ? `&end_date=${endDate}` : ''}${
      source ? `&fq=source:(${source})` : ''
    }`
  );
};

const _constructTheGuardianApiQyery = ({
  endDate,
  page = 1,
  pageSize = 30,
  queryKeyWord,
  startDate
}: Partial<TGetArticlesRequest>) => {
  const queryParams = [];

  queryParams.push(`page=${page}`);
  if (queryKeyWord) {
    queryParams.push(`q=${queryKeyWord}`);
  }
  if (pageSize) {
    queryParams.push(`page-size=${Math.ceil(pageSize / 3)}`);
  } else {
    queryParams.push(`page-size=10`);
  }

  if (startDate) queryParams.push(`from-date=${startDate}`);
  if (endDate) queryParams.push(`to-date=${endDate}`);

  return theGuardianAPiAxiosInstance.get(
    `/search?api-key=${process.env.REACT_APP_GUARDIAN_API_KEY}${
      queryParams.length > 0 ? `&${queryParams.join('&')}` : ''
    }&show-fields=headline,trailText,byline,shortUrl,thumbnail,bodyText,publication`
  );
};

export const _getArticles = async (
  payload: Partial<TGetArticlesRequest>
): Promise<{
  success: boolean;
  articles?: TSourceArticlesData;
  error?: any;
}> => {
  try {
    const newsApiQueryPromise = _constructNewsApiQuery(payload);
    const newYorkTimesApiQueryPromise = _constructNewYorkTimesApiQuery(payload);
    const theGuardianApiQueryPromise = _constructTheGuardianApiQyery(payload);

    const response = await Promise.allSettled([
      newsApiQueryPromise,
      newYorkTimesApiQueryPromise,
      theGuardianApiQueryPromise
    ]);

    let articles: TArticle[] = [];
    const newsApiResponse = response[0];
    if (newsApiResponse.status === 'fulfilled') {
      const articles1 = articlesDataMapper(
        'newsApi',
        newsApiResponse.value.data.articles
      );
      articles = [...articles, ...articles1];
    }
    const newYorkTimesApiResponse = response[1];
    if (newYorkTimesApiResponse.status === 'fulfilled') {
      const articles2 = articlesDataMapper(
        'newYorkTimes',
        newYorkTimesApiResponse.value.data.response.docs
      );
      articles = [...articles, ...articles2];
    }
    const theGuardianApiResponse = response[2];
    if (theGuardianApiResponse.status === 'fulfilled') {
      const articles3 = articlesDataMapper(
        'guardian',
        theGuardianApiResponse.value.data.response.results
      );
      articles = [...articles, ...articles3];
    }

    return {
      success: true,
      articles: groupArticlesBySource(articles)
    };
  } catch (error) {
    console.log('Error fetching articles', error);
    return {
      success: false,
      error
    };
  }
};
