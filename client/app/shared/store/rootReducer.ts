import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../../../features/authentication/model/userSlice';
import testReducer from '../../entities/test/model/testSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  test: testReducer,
});
