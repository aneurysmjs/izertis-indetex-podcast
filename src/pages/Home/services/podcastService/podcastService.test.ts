import { expect, it, vi, describe, afterEach, type Mocked } from 'vitest';

import api from '@/services/api';

import podcastMockData from './podcastMockData';
import { getPodcast } from './podcastService';

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
});
