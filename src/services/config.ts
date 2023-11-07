import axios from 'axios';

export const newsAPiAxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_NEWS_API_URL}`,
  headers: {
    'X-Api-Key': process.env.REACT_APP_NEWS_API_KEY
  },
  validateStatus: (status) => status < 500
});

export const newYorkTimesAPiAxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_NYT_API_URL}`,
  validateStatus: (status) => status < 500
});

export const theGuardianAPiAxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_GUARDIAN_API_URL}`,
  validateStatus: (status) => status < 500
});

export const newYorkTimesArticleImageBaseUrl = 'https://static01.nyt.com';
