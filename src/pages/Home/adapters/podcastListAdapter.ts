import type { AxiosResponse } from 'axios';
import type { PodcastResponse } from '@/entities';

export default function podcastListAdapter(response: AxiosResponse<PodcastResponse>) {
  return response.data.feed.entry;
}
