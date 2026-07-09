import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import leaderboardsReducer from '../features/leaderboard/leaderboardSlice';
import LeaderboardPage from '../pages/LeaderboardPage';
import * as api from '../utils/api';

const createStoreWithLeaderboards = (leaderboards) => {
  return configureStore({
    reducer: {
      leaderboards: leaderboardsReducer,
    },
    preloadedState: {
      leaderboards: {
        leaderboards,
        loading: false,
        error: null,
      },
    },
  });
};

describe('LeaderboardPage', () => {
  describe('Positive Scenarios', () => {
    it('should render list of leaderboards', async () => {
      const mockLeaderboards = [
        {
          user: { id: '1', name: 'Test1', avatar: 'https://example.com/Test1.jpg' },
          score: 120,
        },
        {
          user: { id: '2', name: 'Test2', avatar: 'https://example.com/Test2.jpg' },
          score: 95,
        },
      ];

      api.getLeaderboards.mockResolvedValue({
        error: false,
        data: { leaderboards: mockLeaderboards },
      });

      const store = createStoreWithLeaderboards(mockLeaderboards);

      render(
        <Provider store={store}>
          <MemoryRouter>
            <LeaderboardPage />
          </MemoryRouter>
        </Provider>
      );

      await screen.findByText('Leaderboard');

      expect(screen.getByText('Test1')).toBeInTheDocument();
      expect(screen.getByText('120')).toBeInTheDocument();
      expect(screen.getByText('Test2')).toBeInTheDocument();
      expect(screen.getByText('95')).toBeInTheDocument();
    });
  });

  describe('Negative Scenarios', () => {
    it('should show empty state when no leaderboards', async () => {
      api.getLeaderboards.mockResolvedValue({
        error: false,
        data: { leaderboards: [] },
      });

      const store = createStoreWithLeaderboards([]);

      render(
        <Provider store={store}>
          <MemoryRouter>
            <LeaderboardPage />
          </MemoryRouter>
        </Provider>
      );

      await screen.findByText('Tidak ada data leaderboard');
      expect(screen.getByText('Tidak ada data leaderboard')).toBeInTheDocument();
    });
  });
});
