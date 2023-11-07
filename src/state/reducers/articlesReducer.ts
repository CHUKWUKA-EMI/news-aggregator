import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  TCategoriesData,
  TGetArticlesRequest,
  TSource,
  TSourceArticlesData
} from '../../types/newsSources';

type TLoadingState = true | false;

type InitialState = {
  categoriesData: TCategoriesData;
  selectedCategory: TSource[] | null;
  articles: TSourceArticlesData;
  articlesSearchQueryParams: Partial<TGetArticlesRequest>;
  loading: boolean;
};
const articleSlice = createSlice({
  name: 'article',
  initialState: {
    categoriesData: {},
    selectedCategory: [],
    articles: {},
    articlesSearchQueryParams: {
      page: 1,
      pageSize: 30
    },
    loading: false
  } as InitialState,
  reducers: {
    setCategories: (
      state: InitialState,
      action: PayloadAction<TCategoriesData>
    ) => {
      state.categoriesData = action.payload;
      //set a default selected category
      state.selectedCategory = action.payload['general'];
    },

    setSelectedCategory: (
      state: InitialState,
      action: PayloadAction<keyof TCategoriesData>
    ) => {
      state.selectedCategory = state.categoriesData[action.payload];
    },

    setArticles: (
      state: InitialState,
      action: PayloadAction<TSourceArticlesData>
    ) => {
      state.articles = action.payload;
    },

    addArticles: (
      state: InitialState,
      action: PayloadAction<TSourceArticlesData>
    ) => {
      (
        Object.keys(action.payload) as Array<keyof typeof action.payload>
      ).forEach((source) => {
        if (state.articles[source]) {
          state.articles[source] = state.articles[source].concat(
            action.payload[source]
          );
        } else {
          state.articles = {
            ...state.articles,
            [source]: action.payload[source]
          };
        }
      });
    },

    setSearchQueryParams: (
      state: InitialState,
      action: PayloadAction<Partial<TGetArticlesRequest>>
    ) => {
      (
        Object.keys(action.payload) as Array<keyof typeof action.payload>
      ).forEach((key) => {
        if (key && action.payload[key]) {
          state.articlesSearchQueryParams = {
            ...state.articlesSearchQueryParams,
            [key]: action.payload[key]
          };
        }
      });
    },
    setLoadingState: (
      state: InitialState,
      action: PayloadAction<TLoadingState>
    ) => {
      state.loading = action.payload;
    }
  }
});

export const {
  setCategories,
  setSelectedCategory,
  setArticles,
  setSearchQueryParams,
  addArticles,
  setLoadingState
} = articleSlice.actions;
export default articleSlice.reducer;
