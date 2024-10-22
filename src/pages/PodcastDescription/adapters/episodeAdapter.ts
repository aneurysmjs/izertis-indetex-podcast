import type { AxiosResponse } from 'axios';
import type { PodcastDescriptionResponse } from '@entities';

export default function episodeAdapter(episodeId: string) {
  return function (response: AxiosResponse<PodcastDescriptionResponse>) {
    const [, ...episodes] = response.data.results;

    return episodes.find(({ trackId }) => trackId === +episodeId);
  };
}
