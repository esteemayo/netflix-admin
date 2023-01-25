import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'redux/user/userSlice';
import listReducer from 'redux/list/listSlice';
import movieReducer from 'redux/movie/movieSlice';
import darkModeReducer from 'redux/darkMode/darkModeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    lists: listReducer,
    movies: movieReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
