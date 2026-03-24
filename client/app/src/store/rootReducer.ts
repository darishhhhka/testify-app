import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../../../features/authentication/model/userSlice';
import testReducer from '../../entities/test/testSlice';
import createTestReducer from './createTestSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  test: testReducer,
  createTest: createTestReducer,
});
