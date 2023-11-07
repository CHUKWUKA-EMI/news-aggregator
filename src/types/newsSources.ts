export type TSourcesRequestResponse = {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
};

export type TSource = Pick<TSourcesRequestResponse, 'id' | 'name' | 'url'>;

export type TCategoriesData = {
  [k: string]: TSource[];
};

export type TDataSources = 'newsApi' | 'newYorkTimes' | 'guardian';

export type TGetArticlesRequest = {
  queryKeyWord: string;
  source: string;
  sourceId: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
  page: number;
  pageSize: number;
};

export type TArticle = {
  source: string;
  author: string;
  title: string;
  description: string;
  url: string;
  imageLink: string;
  publishedDate: Date;
  content: string;
};

export type TSourceArticlesData = {
  [k: string]: TArticle[];
};

export type TCustomizedNewsFeedData = {
  feedName: string;
  categories: { index: number; name: string }[];
  sources: Pick<TSource, 'id' | 'name'>[];
};
