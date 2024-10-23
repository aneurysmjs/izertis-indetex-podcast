import { expect, it, vi, describe, afterEach, type Mocked } from 'vitest';

import api from '@/services/api';

import { getPodcastDescription } from './podcastDescriptionService';
import podcastDescriptionMockData from './podcastDescriptionMockData';

vi.mock('@/services/api');

const mockApi = api as Mocked<typeof api>;

describe('podcastDescriptionService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getPodcastDescription', () => {
    it('resolves podcast description data', async () => {
      mockApi.get.mockResolvedValue(podcastDescriptionMockData);
      const response = await getPodcastDescription('123456');

      const [podcastDescription] = response.results;
      expect(podcastDescription).toHaveProperty('artistName');
    });

    it('rejects due bad request', async () => {
      const networkError = new Error('Network Error');
      mockApi.get.mockRejectedValue(networkError);

      await expect(getPodcastDescription('123456')).rejects.toStrictEqual(networkError);
    });
  });
});
