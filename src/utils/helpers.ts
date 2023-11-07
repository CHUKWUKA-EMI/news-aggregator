import { newYorkTimesArticleImageBaseUrl } from '../services/config';
import {
  TArticle,
  TCategoriesData,
  TDataSources,
  TSource,
  TSourceArticlesData,
  TSourcesRequestResponse
} from '../types/newsSources';

export const formatSourcesData = (data: TSourcesRequestResponse[]) => {
  const categoriesMap = new Map<string, TSource[]>();
  data.forEach((d) => {
    const category = categoriesMap.get(d.category);
    if (category) {
      categoriesMap.set(
        d.category,
        category.concat([{ id: d.id, name: d.name, url: d.url }])
      );
    } else {
      categoriesMap.set(d.category, [{ id: d.id, name: d.name, url: d.url }]);
    }
  });
  const categoriesData: TCategoriesData = Object.fromEntries(categoriesMap);
  return categoriesData;
};

export const articlesDataMapper = (dataSource: TDataSources, data: any[]) => {
  const articles: TArticle[] = [];

  switch (dataSource) {
    case 'newsApi':
      data.forEach((d) => {
        articles.push({
          author: d.author,
          content: d.content,
          description: d.description,
          imageLink: d.urlToImage,
          publishedDate: d.publishedAt,
          source: d.source.name,
          title: d.title,
          url: d.url
        } as TArticle);
      });
      break;
    case 'guardian':
      data.forEach((d) => {
        if (
          (d.type === 'article' || d.type === 'liveblog') &&
          Object.keys(d.fields).length
        ) {
          const fields = d.fields;
          articles.push({
            author: fields.byline,
            content: fields.bodyText,
            description: fields.headline,
            imageLink: fields.thumbnail,
            publishedDate: d.webPublicationDate,
            source:
              fields.publication === 'theguardian.com'
                ? 'The Guardian'
                : fields.publication,
            title: d.webTitle,
            url: fields.shortUrl
          } as TArticle);
        }
      });
      break;
    case 'newYorkTimes':
      data.forEach((d) => {
        let imageLink;
        if (d.multimedia && d.multimedia.length) {
          const multimediaWithImage = d.multimedia.find(
            (m: any) => m.type === 'image' && Boolean(m.url)
          );
          if (multimediaWithImage) {
            imageLink = `${newYorkTimesArticleImageBaseUrl}/${multimediaWithImage.url}`;
          }
        }
        articles.push({
          author: d.byline.original,
          content: d.abstract,
          description: d.snippet,
          imageLink: imageLink ?? null,
          publishedDate: d.pub_date,
          source: d.source,
          title: d.headline.main,
          url: d.web_url
        } as TArticle);
      });
      break;
    default:
      break;
  }

  return articles;
};

export const groupArticlesBySource = (articles: TArticle[]) => {
  const articlesToSourceMap = new Map<string, TArticle[]>();
  articles.forEach((article) => {
    const source = articlesToSourceMap.get(article.source);
    if (source) {
      articlesToSourceMap.set(article.source, source.concat([article]));
    } else {
      articlesToSourceMap.set(article.source, [article]);
    }
  });

  const articlesGroupedBySource: TSourceArticlesData =
    Object.fromEntries(articlesToSourceMap);

  return articlesGroupedBySource;
};

export const formatDate = (date: Date) => {
  if (date) {
    return date.toISOString().split('T')[0];
  }
};

export const today = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
);

export const oneMonthAgo = new Date(
  new Date().getFullYear(),
  new Date().getMonth() - 1,
  new Date().getDate()
);
