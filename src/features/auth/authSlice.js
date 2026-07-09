import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI, getOwnProfile, putAccessToken, getAccessToken } from '../../utils/api';

const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue, dispatch }) => {
  const result = await loginAPI({ email, password });
  if (result.error) return rejectWithValue(result.message);
  putAccessToken(result.data.token);
  await dispatch(fetchUser());
  return result.data.token;
});

const registerUser = createAsyncThunk('auth/register', async ({ name, email, password }, { rejectWithValue }) => {
  const result = await registerAPI({ name, email, password });
  if (result.error) return rejectWithValue(result.message);
  return result;
});

const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  const result = await getOwnProfile();
  if (result.error) return rejectWithValue(result.message);
  return result.data.user;
});

const initialState = {
  token: getAccessToken() || null,
  user: null,
  isLogged: !!getAccessToken(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLogged = false;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isLogged = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login gagal';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registrasi gagal';
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export { loginUser, registerUser, fetchUser };
export default authSlice.reducer;
