import { describe, it, expect } from 'vitest';
import { showThreads } from '../features/threads/threadsSlice';
import { createTestStore } from './test-utils';
import * as api from '../utils/api';

describe('showThreads thunk', () => {
  it('should fetch threads successfully', async () => {
    const mockThreads = {
      data: { threads: [{ id: '1', title: 'Test', ownerId: 'user-1' }] },
    };
    const mockUsers = {
      data: { users: [{ id: 'user-1', name: 'Test', avatar: 'test.jpg' }] },
    };

    api.getAllThreads.mockResolvedValue({ error: false, ...mockThreads });
    api.getAllUsers.mockResolvedValue({ error: false, ...mockUsers });

    const store = createTestStore();
    await store.dispatch(showThreads());

    const state = store.getState();
    expect(state.thread.threadList).toHaveLength(1);
    expect(state.thread.threadList[0].owner.name).toBe('Test');
    expect(state.thread.loading).toBe(false);
    expect(state.thread.error).toBeNull();

    expect(api.getAllThreads).toHaveBeenCalledTimes(1);
    expect(api.getAllUsers).toHaveBeenCalledTimes(1);
  });

  it('should handle API error', async () => {
    api.getAllThreads.mockResolvedValue({ error: true, message: 'Network Error' });

    const store = createTestStore();
    await store.dispatch(showThreads());

    const state = store.getState();
    expect(state.thread.threadList).toEqual([]);
    expect(state.thread.loading).toBe(false);
    expect(state.thread.error).toBe('Network Error');
  });
});
