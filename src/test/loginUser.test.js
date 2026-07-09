import { describe, it, expect } from 'vitest';
import { loginUser } from '../features/auth/authSlice';
import { createTestStore } from './test-utils';
import * as api from '../utils/api';

describe('loginUser thunk', () => {
  it('should login successfully', async () => {
    const mockToken = 'fake-token';
    api.loginAPI.mockResolvedValue({
      error: false,
      data: { token: mockToken },
    });
    api.getOwnProfile.mockResolvedValue({
      error: false,
      data: { user: { id: '1', name: 'Test' } },
    });

    const store = createTestStore();
    await store.dispatch(loginUser({ email: 'test@gmail.com', password: 'pass' }));

    const state = store.getState();
    expect(state.auth.token).toBe(mockToken);
    expect(state.auth.isLogged).toBe(true);
    expect(state.auth.loading).toBe(false);
  });

  it('should handle login failure', async () => {
    api.loginAPI.mockResolvedValue({
      error: true,
      message: 'Invalid credentials',
    });

    const store = createTestStore();
    await store.dispatch(loginUser({ email: 'test@gmail.com', password: 'wrong' }));

    const state = store.getState();
    expect(state.auth.token).toBeNull();
    expect(state.auth.isLogged).toBe(false);
    expect(state.auth.error).toBe('Invalid credentials');
  });
});
