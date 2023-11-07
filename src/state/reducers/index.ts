import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './themeReducer';
import articlesReducer from './articlesReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  articles: articlesReducer
});

export default rootReducer;
