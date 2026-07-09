import { describe, it, expect } from 'vitest';
import threadReducer, { showThreads } from '../features/threads/threadsSlice';

describe('threadSlice reducer', () => {
  describe('Positive Scenarios', () => {
    it('should handle showThreads.pending', () => {
      const initialState = {
        threadList: [],
        loading: false,
        error: null,
      };
      const mockThreads = [{ id: '1', title: 'Test Thread', owner: { name: 'Test' } }];

      const action = showThreads.pending(mockThreads);
      const nextState = threadReducer(initialState, action);
      expect(nextState.loading).toBe(true);
      expect(nextState.threadList).toEqual([]);
      expect(nextState.error).toBeNull();
    });

    it('should handle showThreads.fulfilled', () => {
      const initialState = {
        threadList: [],
        loading: false,
        error: null,
      };
      const mockThreads = [{ id: '1', title: 'Test Thread', owner: { name: 'Test' } }];

      const action = showThreads.fulfilled(mockThreads);
      const nextState = threadReducer(initialState, action);
      expect(nextState.loading).toBe(false);
      expect(nextState.threadList).toEqual(mockThreads);
      expect(nextState.error).toBeNull();
    });
    it('should handle showThreads.fulfilled with empty data', () => {
      const initialState = {
        threadList: [],
        loading: false,
        error: null,
      };

      const action = showThreads.fulfilled([]);
      const nextState = threadReducer(initialState, action);
      expect(nextState.loading).toBe(false);
      expect(nextState.threadList).toEqual([]);
      expect(nextState.error).toBeNull();
    });
  });
  describe('Negative Scenarios', () => {
    it('should handle showThreads.rejected with payload', () => {
      const initialState = {
        threadList: [],
        loading: false,
        error: null,
      };
      const action = {
        type: showThreads.rejected.type,
        payload: 'Server is down',
      };
      const nextState = threadReducer(initialState, action);
      expect(nextState.loading).toBe(false);
      expect(nextState.threadList).toEqual([]);
      expect(nextState.error).toEqual('Server is down');
    });
  });
});
