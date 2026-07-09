import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderboards } from '../../utils/api';

const fetchLeaderboards = createAsyncThunk('leaderboards/fetch', async (_, { rejectWithValue }) => {
  const leaderboards = await getLeaderboards();
  if (leaderboards.error) return rejectWithValue(leaderboards.message);
  return leaderboards.data.leaderboards;
});

const initialState = {
  leaderboards: null,
  loading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboards = action.payload;
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch leaderboards';
      });
  },
});

export { fetchLeaderboards };
export default leaderboardSlice.reducer;
