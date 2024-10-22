import { useQuery } from '@tanstack/react-query';

import { getPodcastDescription } from '@/services/podcastService';
import episodeAdapter from '@/pages/PodcastDescription/adapters/episodeAdapter';

export default function useGetEpisode(id: string, episodeId: string) {
  return useQuery({
    queryFn: () => getPodcastDescription(id),
    queryKey: ['episode', id],
    select: episodeAdapter(episodeId),
  });
}
