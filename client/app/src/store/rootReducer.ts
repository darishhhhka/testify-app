import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import testReducer from './testSlice'
import createTestReducer from './createTestSlice'

export const rootReducer = combineReducers({
    user: userReducer,
    test: testReducer,
    createTest: createTestReducer
})