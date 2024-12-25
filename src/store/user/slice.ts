import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserCredentials, User, OmittedUser } from './types';
import { createUser as createUserService } from '../../api/user';
import { login as loginUserService } from '../../api/auth';
import { LoadingStatus } from '../ad/slice';

export const createUser = createAsyncThunk<OmittedUser, UserCredentials>(
  'user/createUser',
  async (newUserParams) => {
    const token = (await createUserService(newUserParams)).token;
    return { token, username: newUserParams.username };
  },
);

export const logIn = createAsyncThunk<OmittedUser, UserCredentials>(
  'user/logIn',
  async (credentials) => {
    const token = (await loginUserService(credentials)).token;
    // dispatch(setUser({ name: credentials.name, token }));
    return { token, username: credentials.username };
  },
);

const initialState: User = {
  username: null,
  token: null,
  loading: LoadingStatus.IDLE,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.username = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.username = null;
      state.token = null;
      state.loading = LoadingStatus.PENDING;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.loading = LoadingStatus.FULFILLED;
    });
    builder.addCase(logIn.rejected, (state) => {
      state.username = null;
      state.token = null;
      state.loading = LoadingStatus.REJECTED;
    });

    builder.addCase(createUser.pending, (state) => {
      state.username = null;
      state.token = null;
      state.loading = LoadingStatus.PENDING;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.loading = LoadingStatus.FULFILLED;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.username = null;
      state.token = null;
      state.loading = LoadingStatus.REJECTED;
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
