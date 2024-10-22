import { useQuery } from '@tanstack/react-query';

import { getPodcastDescription } from '@/services/podcastService';
import podcastDescriptionAdapter from '@/pages/PodcastDescription/adapters/podcastDescriptionAdapter';

export default function useGetPodcastDescription(id: string) {
  return useQuery({
    queryFn: () => getPodcastDescription(id),
    queryKey: ['podcastDescription', id],
    select: podcastDescriptionAdapter,
    staleTime: Infinity,
  });
}
