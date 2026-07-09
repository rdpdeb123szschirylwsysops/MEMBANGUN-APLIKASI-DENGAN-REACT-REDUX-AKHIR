import { describe, it, expect } from 'vitest';
import authReducer, { logout } from '../features/auth/authSlice';

describe('authSlice reducer', () => {
  describe('Positive Scenarios', () => {
    it('should handle logout from logged-in state', () => {
      const initialState = {
        token: 'fake-token',
        user: { id: '1', name: 'Test' },
        isLogged: true,
        loading: false,
        error: null,
      };
      const nextState = authReducer(initialState, logout());
      expect(nextState.token).toBeNull();
      expect(nextState.user).toBeNull();
      expect(nextState.isLogged).toBe(false);
    });
  });

  describe('Negative Scenarios', () => {
    it('should ignore unknown actions', () => {
      const initialState = {
        token: 'fake-token',
        user: { id: '1', name: 'Test' },
        isLogged: true,
        loading: false,
        error: null,
      };
      const nextState = authReducer(initialState, { type: 'UNKNOWN_ACTION' });
      expect(nextState).toEqual(initialState);
    });
  });
});
