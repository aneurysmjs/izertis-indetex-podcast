import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import ImageSkeleton from '@/components/common/ImageSkeleton';
import useGetPodcastDescription from '@/pages/PodcastDescription/hooks/useGetPodcastDescription';

const PodcastSidebar: FC = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error('podcaster: id not found');
  }

  const { data: podcastDescription, isLoading } = useGetPodcastDescription(id);

  return (
    <aside
      className={`
        text-theme mb-4 w-full self-start bg-white p-4 shadow-md

        dark:bg-gray-800 dark:shadow-none

        lg:mb-0
      `}
    >
      <figure>
        {isLoading ? (
          <span className="h-72 w-72">
            <ImageSkeleton />
          </span>
        ) : (
          <img
            loading="lazy"
            className={`
              m-auto aspect-square h-72 w-72 rounded-sm object-contain

              lg:m-initial
            `}
            src={podcastDescription?.artworkUrl600}
            alt={podcastDescription?.collectionName}
          />
        )}
      </figure>

      <article>
        <header className="my-2">
          <h5>{podcastDescription?.collectionName}</h5>
        </header>
        <p>
          <span>By: </span>
          {podcastDescription?.artistName}
        </p>
      </article>
    </aside>
  );
};

export default PodcastSidebar;
