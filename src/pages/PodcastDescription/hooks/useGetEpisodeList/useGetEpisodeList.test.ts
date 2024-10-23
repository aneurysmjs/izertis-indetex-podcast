import { expect, it, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { WithQueryWrapper } from '@/utils/testUtils/renderWithQueryClient';
import podcastDescriptionMockData from '@/services/podcastService/podcastDescriptionMockData';

import useGetEpisodeList from './useGetEpisodeList';

const { mockGetPodcastDescription } = vi.hoisted(() => ({
  mockGetPodcastDescription: vi.fn(),
}));

vi.mock('@/services/podcastService', () => ({
  getPodcastDescription: mockGetPodcastDescription,
}));

describe('useGetEpisodeList', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return episode list', async () => {
    mockGetPodcastDescription.mockResolvedValue({ data: podcastDescriptionMockData });

    const { result } = renderHook(() => useGetEpisodeList('1'), { wrapper: WithQueryWrapper });

    expect(mockGetPodcastDescription).toHaveBeenCalledWith('1');
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(podcastDescriptionMockData.results.slice(1));
      expect(result.current.isLoading).toBe(false);
    });
  });
});
