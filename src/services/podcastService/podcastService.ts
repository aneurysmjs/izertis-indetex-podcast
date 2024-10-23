import axios from 'axios';

import type { PodcastResponse, PodcastDescriptionResponse } from '@/entities';

const PODCAST_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

const PODCAST_BY_ID_URL = 'https://itunes.apple.com/lookup';

export const getPodcast = () => axios.get<PodcastResponse>(PODCAST_URL);

export const getPodcastDescription = (id: string) =>
  axios.get<PodcastDescriptionResponse>(PODCAST_BY_ID_URL, {
    params: {
      id,
      media: 'podcast',
      entity: 'podcastEpisode',
      limit: 20,
    },
  });
