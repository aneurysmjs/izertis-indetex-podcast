import { useQuery } from '@tanstack/react-query';

import { getPodcastDescription } from '@/services/podcastService';
import episodeListAdapter from '@/pages/PodcastDescription/adapters/episodeListAdapter';

export default function useGetEpisodeList(id: string) {
  return useQuery({
    queryFn: () => getPodcastDescription(id),
    queryKey: ['episodeList', id],
    select: episodeListAdapter,
  });
}
