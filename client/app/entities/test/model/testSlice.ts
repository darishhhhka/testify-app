import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { $host } from '../../../shared/api';
import {
  CreatedTests,
  PassedTests,
  RequestTest,
  RequestTestAttemp,
  Test,
  TestAttemp,
  TestSlice,
} from './types';

const initialState: TestSlice = {
  created: { createdTest: {}, status: 'empty' },
  passed: { passedTests: {}, status: 'empty' },
  currentTest: { id: null, name: '', questions: [] },
  currentTestAttempt: { id: null, score: null, test: { name: '', questions: [] } },
};

export const fetchMyTest = createAsyncThunk<CreatedTests[], RequestTest, { rejectValue: string }>(
  'test/fetchMyTest',
  async ({ userId }: RequestTest, { rejectWithValue }) => {
    try {
      const { data } = await $host.get(`api/test/my-tests?userId=${userId}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue('Ошибка загрузки тестов');
    }
  },
);

export const fetchTest = createAsyncThunk<
  Test,
  { testId: number; includeAnswers?: boolean },
  { rejectValue: string }
>(
  'test/fetchTest',
  async (
    { testId, includeAnswers }: { testId: number; includeAnswers?: boolean },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await $host.get(
        `api/test/test?testId=${testId}&includeAnswers=${includeAnswers}`,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue('Ошибка загрузки теста');
    }
  },
);

export const fetchPassedTest = createAsyncThunk<
  PassedTests[],
  RequestTest,
  { rejectValue: string }
>('test/fetchPassedTest', async ({ userId }: RequestTest, { rejectWithValue }) => {
  try {
    const { data } = await $host.get(`api/test/passed-tests?userId=${userId}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue('Ошибка загрузки тестов');
  }
});

export const deleteMyTest = createAsyncThunk<
  { message: string; testId: number },
  { testId: number },
  { rejectValue: string }
>('test/deleteTest', async ({ testId }: { testId: number }, { rejectWithValue }) => {
  try {
    const { data } = await $host.delete(`api/test?testId=${testId}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue('Ошибка удаления теста');
  }
});

export const fetchTestAttemp = createAsyncThunk<
  TestAttemp,
  RequestTestAttemp,
  { rejectValue: string }
>(
  'testAttemp/fetchTestAttemp',
  async ({ testAttempId }: RequestTestAttemp, { rejectWithValue }) => {
    try {
      const { data } = await $host.get(`api/test-attemp?testAttempId=${testAttempId}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue('Ошибка при загрузке');
    }
  },
);

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    // setTests: (state, actions:PayloadAction<Test[]>) => {
    //     actions.payload.map(test => {
    //         state.created[test.id] = {name: test.name, createdAt: test.createdAt.split('T')[0], result: test.result}
    //     })
    // },

    deletedAllTests: (state) => {
      state.created.createdTest = {};
      state.passed.passedTests = {};
      state.created.status = 'empty';
      state.passed.status = 'empty';
    },

    deletedTest: (state, actions: PayloadAction<{ id: number }>) => {
      delete state.created.createdTest[actions.payload.id];
    },
  },
  extraReducers(builder) {
    (builder.addCase(fetchMyTest.fulfilled, (state, actions) => {
      actions.payload.forEach(({ id, ...test }) => {
        state.created.createdTest[id] = test;
      });
      state.created.status = 'succes';
    }),
      builder.addCase(fetchPassedTest.fulfilled, (state, actions) => {
        console.log('actions', actions.payload);

        actions.payload.forEach(({ testId, ...test }) => {
          state.passed.passedTests[testId] = test;
        });
        state.passed.status = 'succes';
      }),
      builder.addCase(deleteMyTest.fulfilled, (state, action) => {
        delete state.created.createdTest[action.payload.testId];
      }),
      builder.addCase(fetchTestAttemp.fulfilled, (state, action) => {
        state.currentTestAttempt.id = action.payload.id;
        state.currentTestAttempt.score = action.payload.score;
        state.currentTestAttempt.test = action.payload.test;
      }),
      builder.addCase(fetchTest.fulfilled, (state, actions) => {
        state.currentTest.id = actions.payload.id;
        state.currentTest.name = actions.payload.name;
        state.currentTest.questions = actions.payload.questions;
        console.log('Отработал феч', actions.payload);
      }));
  },
});

export const { deletedAllTests, deletedTest } = testSlice.actions;
export default testSlice.reducer;
