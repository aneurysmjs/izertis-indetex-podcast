import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { WithQueryWrapper } from '@/utils/testUtils/renderWithQueryClient';
import podcastDescriptionMockData from '@/pages/PodcastDescription/services/podcastDescriptionService/podcastDescriptionMockData';

import useGetEpisode from './useGetEpisode';

const { mockGetPodcastDescription } = vi.hoisted(() => ({
  mockGetPodcastDescription: vi.fn(),
}));

vi.mock('@/pages/PodcastDescription/services/podcastDescriptionService', () => ({
  getPodcastDescription: mockGetPodcastDescription,
}));

describe('useGetEpisode', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return an episode', async () => {
    mockGetPodcastDescription.mockResolvedValue({ data: podcastDescriptionMockData });

    const { result } = renderHook(() => useGetEpisode('1', '1000608903551'), {
      wrapper: WithQueryWrapper,
    });

    expect(mockGetPodcastDescription).toHaveBeenCalledWith('1');
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(podcastDescriptionMockData.results[1]);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
