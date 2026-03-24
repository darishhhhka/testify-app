import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { $authHost, $host } from '../../../app/src/api';
import { jwtDecode } from 'jwt-decode';
import { AxiosError } from 'axios';
import { Authorization, Registration, ResponseUser, User } from './types';

const initialState: User = {
  id: null,
  login: '',
  role: null,
  isAuth: false,
  checked: false,
};

export const registration = createAsyncThunk<ResponseUser, Registration, { rejectValue: string }>(
  'user/registration',
  async ({ login, password, role }: Registration, { rejectWithValue }) => {
    try {
      const { data } = await $host.post('api/user/registration', { login, password, role });
      localStorage.setItem('token', data.token);
      return jwtDecode(data.token);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue('Ошибка регистрации');
    }
  },
);

export const login = createAsyncThunk<ResponseUser, Authorization, { rejectValue: string }>(
  'user/login',
  async ({ login, password }: Authorization, { rejectWithValue }) => {
    try {
      const { data } = await $host.post('api/user/login', { login, password });
      localStorage.setItem('token', data.token);
      return jwtDecode(data.token);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue('Ошибка авторизации');
    }
  },
);

export const check = createAsyncThunk<ResponseUser, void, { rejectValue: string }>(
  'user/check',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $authHost.get('api/user/auth');
      localStorage.setItem('token', data.token);
      return jwtDecode(data.token);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue('Пользователь не авторизован');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state, actions: PayloadAction<{ isAuth: boolean }>) => {
      state.isAuth = actions.payload.isAuth;
    },
    setUser: (state, actions: PayloadAction<{ id: number | null; login: string }>) => {
      state.id = actions.payload.id;
      state.login = actions.payload.login;
    },
    setChecked: (state, actions: PayloadAction<{ checked: boolean }>) => {
      state.checked = actions.payload.checked;
    },
  },
  extraReducers(builder) {
    (builder.addMatcher(
      isAnyOf(registration.fulfilled, login.fulfilled, check.fulfilled),
      (state, actions) => {
        state.id = actions.payload.id;
        state.login = actions.payload.login;
        state.role = actions.payload.role;
        state.isAuth = true;
        state.checked = true;
      },
    ),
      builder.addMatcher(isAnyOf(registration.pending, login.pending, check.pending), (state) => {
        state.checked = false;
      }));
  },
});

export const { setIsAuth, setUser, setChecked } = userSlice.actions;
export default userSlice.reducer;
