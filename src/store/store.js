import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import threadReducer from '../features/threads/threadsSlice';
import threadDetailReducer from '../features/threadDetail/threadDetailSlice';
import voteReducer from '../features/vote/voteSlice';
import leaderboardsReducer from '../features/leaderboard/leaderboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    thread: threadReducer,
    threadDetail: threadDetailReducer,
    vote: voteReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
