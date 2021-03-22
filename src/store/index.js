import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import user from '../features/login/loginSlice'
import game from './game'

const reducer = combineReducers({
  user,
  game,
});

const store = configureStore({
  reducer,
});

export default store;
