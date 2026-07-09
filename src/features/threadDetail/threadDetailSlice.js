import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getThreadDetail, createComment } from '../../utils/api';

const fetchThreadDetail = createAsyncThunk('threadDetail/fetch', async (id, { rejectWithValue }) => {
  const result = await getThreadDetail(id);
  if (result.error) return rejectWithValue(result.message);
  return result.data.detailThread;
});

const addComment = createAsyncThunk('threadDetail/createComment', async ({ threadId, content }, { rejectWithValue }) => {
  const commentResult = await createComment({ threadId, content });
  if (commentResult.error) return rejectWithValue(commentResult.message);
  return commentResult.data.comment;
});

const initialState = {
  thread: null,
  loading: false,
  error: null,
};

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.thread = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch thread detail';
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        if (state.thread) {
          state.thread.comments.push(action.payload);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add comment';
      });
  },
});

export { fetchThreadDetail, addComment };
export default threadDetailSlice.reducer;
