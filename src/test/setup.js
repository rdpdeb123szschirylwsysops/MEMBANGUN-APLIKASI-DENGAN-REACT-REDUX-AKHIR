import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

vi.mock('../utils/api', () => ({
  getAccessToken: vi.fn(() => null),
  putAccessToken: vi.fn(),
  getOwnProfile: vi.fn(),
  loginAPI: vi.fn(),
  registerAPI: vi.fn(),
  getAllUsers: vi.fn(),
  getAllThreads: vi.fn(),
  getThreadDetail: vi.fn(),
  createComment: vi.fn(),
  createThread: vi.fn(),
  upVoteThread: vi.fn(),
  downVoteThread: vi.fn(),
  neutralVoteThread: vi.fn(),
  upVoteComment: vi.fn(),
  downVoteComment: vi.fn(),
  neutralVoteComment: vi.fn(),
  getLeaderboards: vi.fn(),
}));

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
