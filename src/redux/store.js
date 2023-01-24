import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user';
import listReducer from './list';
import movieReducer from './movie';

const store = configureStore({
  reducer: {
    user: userReducer,
    lists: listReducer,
    movies: movieReducer,
  },
});

export default store;
