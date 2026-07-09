import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllThreads, getAllUsers, createThread } from '../../utils/api';

const showThreads = createAsyncThunk('threads/fetchAll', async (_, { rejectWithValue }) => {
  const threadsResult = await getAllThreads();
  if (threadsResult.error) return rejectWithValue(threadsResult.message);
  const usersResult = await getAllUsers();
  if (usersResult.error) return rejectWithValue(usersResult.message);
  const usersMap = {};
  usersResult.data.users.forEach((user) => {
    usersMap[user.id] = user;
  });
  const threadsWithOwner = threadsResult.data.threads.map((thread) => ({
    ...thread,
    owner: usersMap[thread.ownerId],
  }));

  return threadsWithOwner;
});

const addThread = createAsyncThunk('threads/create', async ({ title, body, category }, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  const threadResult = await createThread({ title, body, category, token });
  if (threadResult.error) return rejectWithValue(threadResult.message);
  return threadResult.data.thread;
});

const initialState = {
  threadList: [],
  loading: false,
  error: null,
};

const threadSlice = createSlice({
  name: 'threads',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(showThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.threadList = action.payload;
      })
      .addCase(showThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Get all threads failed';
      })
      .addCase(addThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addThread.fulfilled, (state, action) => {
        state.loading = false;
        state.threadList.unshift(action.payload);
      })
      .addCase(addThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Get all threads failed';
      });
  },
});

export { showThreads, addThread };
export default threadSlice.reducer;
