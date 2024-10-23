import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { WithQueryWrapper } from '@/utils/testUtils/renderWithQueryClient';
import podcastDescriptionMockData from '@/pages/PodcastDescription/services/podcastDescriptionService/podcastDescriptionMockData';

import useGetPodcastDescription from './useGetPodcastDescription';

const { mockGetPodcastDescription } = vi.hoisted(() => ({
  mockGetPodcastDescription: vi.fn(),
}));

vi.mock('@/pages/PodcastDescription/services/podcastDescriptionService', () => ({
  getPodcastDescription: mockGetPodcastDescription,
}));

describe('useGetPodcastDescription', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return a podcast description', async () => {
    mockGetPodcastDescription.mockResolvedValue({ data: podcastDescriptionMockData });

    const { result } = renderHook(() => useGetPodcastDescription('1'), {
      wrapper: WithQueryWrapper,
    });

    expect(mockGetPodcastDescription).toHaveBeenCalledWith('1');
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(podcastDescriptionMockData.results[0]);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
