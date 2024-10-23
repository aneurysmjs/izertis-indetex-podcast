import api from '@/services/api';
import type { PodcastDescriptionResponse } from '@/entities';

const PODCAST_BY_ID_URL = '/lookup';

export const getPodcastDescription = (id: string) =>
  api.get<PodcastDescriptionResponse>(PODCAST_BY_ID_URL, {
    params: {
      id,
      media: 'podcast',
      entity: 'podcastEpisode',
      limit: 20,
    },
  });
