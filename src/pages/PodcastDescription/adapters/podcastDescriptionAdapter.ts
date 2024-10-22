import type { AxiosResponse } from 'axios';
import type { PodcastDescriptionResponse } from '@entities';

export default function podcastDescriptionAdapter(
  response: AxiosResponse<PodcastDescriptionResponse>,
) {
  return response.data.results[0];
}
