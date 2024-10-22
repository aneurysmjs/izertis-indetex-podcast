import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import PodcastSidebar from '@/pages/PodcastDescription/components/PodcastSidebar';
import PodcastDescriptionLayout from '@/pages/PodcastDescription/layouts/podcastDescriptionLayout';

const PodcastDescription: FC = () => {
  return <PodcastDescriptionLayout sidebar={<PodcastSidebar />} content={<Outlet />} />;
};

export default PodcastDescription;
