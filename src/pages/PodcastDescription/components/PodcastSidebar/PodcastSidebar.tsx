import { type FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import ImageSkeleton from '@/components/common/ImageSkeleton';
import useGetPodcastDescription from '@/pages/PodcastDescription/hooks/useGetPodcastDescription';

const PodcastSidebar: FC = () => {
  const { id } = useParams();

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  if (!id) {
    throw new Error('podcaster: id not found');
  }

  const { data: podcastDescription } = useGetPodcastDescription(id);

  const handleImgLoad = () => {
    setIsImgLoaded(true);
  };

  return (
    <aside
      className={`
        text-theme mb-4 w-full self-start bg-white p-4 shadow-md

        dark:bg-gray-800 dark:shadow-none

        lg:mb-0
      `}
    >
      <figure>
        {!isImgLoaded ? <ImageSkeleton /> : null}
        <img
          loading="lazy"
          className={`
            m-auto aspect-square rounded-sm object-contain

            lg:m-initial
          `}
          src={podcastDescription?.artworkUrl600}
          alt={podcastDescription?.collectionName}
          onLoad={handleImgLoad}
        />
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
