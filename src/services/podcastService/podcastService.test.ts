import { expect, it, vi, describe, afterEach, type Mocked } from 'vitest';

import api from '@/services/api';

import podcastMockData from './podcastMockData';
import { getPodcast, getPodcastDescription } from './podcastService';
import podcastDescriptionMockData from './podcastDescriptionMockData';

vi.mock('@/services/api');

const mockApi = api as Mocked<typeof api>;

describe('podcastService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getPodcast', () => {
    it('resolves podcast data', async () => {
      mockApi.get.mockResolvedValue(podcastMockData);
      const response = await getPodcast();

      expect(response).toStrictEqual(podcastMockData);
    });

    it('rejects due bad request', async () => {
      const networkError = new Error('Network Error');
      mockApi.get.mockRejectedValue(networkError);

      await expect(getPodcast()).rejects.toStrictEqual(networkError);
    });
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
