import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { WithQueryWrapper } from '@/utils/testUtils/renderWithQueryClient';
import podcastMockData from '@/pages/Home/services/podcastService/podcastMockData';

import useGetPodcast from './useGetPodcast';

const { mockGetPodcast } = vi.hoisted(() => ({
  mockGetPodcast: vi.fn(),
}));

vi.mock('@/pages/Home/services/podcastService', () => ({
  getPodcast: mockGetPodcast,
}));

describe('useGetPodcast', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return a podcast list', async () => {
    mockGetPodcast.mockResolvedValue(podcastMockData);

    const { result } = renderHook(() => useGetPodcast(), {
      wrapper: WithQueryWrapper,
    });

    expect(mockGetPodcast).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(podcastMockData.data.feed.entry);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
