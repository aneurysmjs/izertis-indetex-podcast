import { useQuery } from '@tanstack/react-query';

import { getPodcast } from '@/pages/Home/services/podcastService';
import podcastListAdapter from '@/pages/Home/adapters/podcastListAdapter';

export default function useGetPodcast() {
  return useQuery({
    queryFn: getPodcast,
    queryKey: ['podcastList'],
    staleTime: Infinity,
    select: podcastListAdapter,
  });
}
