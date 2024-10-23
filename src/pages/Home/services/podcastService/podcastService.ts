import api from '@/services/api';
import type { PodcastResponse } from '@/entities';

const PODCAST_URL = '/us/rss/toppodcasts/limit=100/genre=1310/json';

export const getPodcast = () => api.get<PodcastResponse>(PODCAST_URL);
