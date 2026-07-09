import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThreadCard from '../components/thread/ThreadCard';

describe('ThreadCard', () => {
  describe('Positive Scenarios', () => {
    it('should render thread title and owner name', () => {
      const mockThread = {
        id: '1',
        title: 'Belajar React',
        body: 'Ini adalah body thread',
        category: 'Programming',
        createdAt: '2024-01-01T00:00:00.000Z',
        totalComments: 5,
        owner: {
          name: 'Test',
          avatar: 'https://example.com/avatar.jpg',
        },
      };

      render(
        <MemoryRouter>
          <ThreadCard thread={mockThread} />
        </MemoryRouter>
      );

      expect(screen.getByText('Belajar React')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('5 komentar')).toBeInTheDocument();
      expect(screen.getByAltText('Test')).toBeInTheDocument();
    });

    it('should render fallback avatar if no avatar provided', () => {
      const mockThread = {
        id: '1',
        title: 'Test',
        body: '...',
        createdAt: '2024-01-01T00:00:00.000Z',
        totalComments: 0,
        owner: {
          name: 'Test',
          avatar: null,
        },
      };

      render(
        <MemoryRouter>
          <ThreadCard thread={mockThread} />
        </MemoryRouter>
      );
      expect(screen.getByAltText('Test')).toBeInTheDocument();
    });

    it('should handle missing owner gracefully', () => {
      const mockThread = {
        id: '1',
        title: 'Test Without Owner',
        body: '...',
        createdAt: '2024-01-01T00:00:00.000Z',
        totalComments: 0,
      };

      render(
        <MemoryRouter>
          <ThreadCard thread={mockThread} />
        </MemoryRouter>
      );
      expect(screen.getByText('Test Without Owner')).toBeInTheDocument();
    });
  });

  describe('Negative Scenarios', () => {
    it('should throw error when thread is null', () => {
      expect(() => {
        render(
          <MemoryRouter>
            <ThreadCard thread={null} />
          </MemoryRouter>
        );
      }).toThrow();
    });

    it('should render with missing id', () => {
      const mockThread = {
        title: 'No ID',
        body: '...',
        createdAt: '2024-01-01T00:00:00.000Z',
        totalComments: 0,
        owner: { name: 'Test', avatar: null },
      };

      render(
        <MemoryRouter>
          <ThreadCard thread={mockThread} />
        </MemoryRouter>
      );
      expect(screen.getByText('No ID')).toBeInTheDocument();
    });
  });
});
