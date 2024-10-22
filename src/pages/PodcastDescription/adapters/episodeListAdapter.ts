import type { AxiosResponse } from 'axios';
import type { PodcastDescriptionResponse } from '@entities';

export default function episodeListAdapter(response: AxiosResponse<PodcastDescriptionResponse>) {
  const [, ...episodes] = response.data.results;

  return episodes;
}
