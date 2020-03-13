import { combineReducers } from 'redux';
import { momentonServer } from '../homePage/homePage.reducer';

export const rootReducer = () => {
  return combineReducers({
    momentonServer
  });
};
