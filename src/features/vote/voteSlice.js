import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { upVoteThread, downVoteThread, neutralVoteThread, upVoteComment, downVoteComment, neutralVoteComment } from '../../utils/api';
import { fetchThreadDetail } from '../threadDetail/threadDetailSlice';

const voteThread = createAsyncThunk('vote/thread', async ({ threadId, type }, { rejectWithValue, dispatch }) => {
  let result;
  if (type === 'up') {
    result = await upVoteThread(threadId);
  } else if (type === 'down') {
    result = await downVoteThread(threadId);
  } else if (type === 'neutral') {
    result = await neutralVoteThread(threadId);
  } else {
    return rejectWithValue('Invalid vote type');
  }

  if (result.error) return rejectWithValue(result.message);
  await dispatch(fetchThreadDetail(threadId));
  return result.data;
});

const voteComment = createAsyncThunk('vote/comment', async ({ threadId, commentId, type }, { rejectWithValue, dispatch }) => {
  let result;
  if (type === 'up') {
    result = await upVoteComment({ threadId, commentId });
  } else if (type === 'down') {
    result = await downVoteComment({ threadId, commentId });
  } else if (type === 'neutral') {
    result = await neutralVoteComment({ threadId, commentId });
  } else {
    return rejectWithValue('Invalid vote type');
  }

  if (result.error) return rejectWithValue(result.message);
  await dispatch(fetchThreadDetail(threadId));
  return result.data;
});

const initialState = {
  loading: false,
  error: null,
};

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(voteThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(voteThread.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(voteThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Vote thread failed';
      })
      .addCase(voteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(voteComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(voteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Vote comment failed';
      });
  },
});

export { voteThread, voteComment };
export default voteSlice.reducer;
