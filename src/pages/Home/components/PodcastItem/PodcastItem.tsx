import type { FC } from 'react';
import type { Podcast } from '@/entities';

interface PodcastItemProps {
  podcast: Podcast;
}

const PodcastItem: FC<PodcastItemProps> = ({ podcast }) => {
  return (
    <article
      className={`
        w-full self-stretch bg-white p-4

        dark:bg-gray-800 dark:md:shadow-none

        hover:cursor-pointer hover:dark:bg-gray-700

        lg:w-60

        md:shadow-lg
      `}
      data-podcast-id={podcast.id.attributes['im:id']}
      data-testid="podcast-item"
    >
      <img
        className="mx-auto mb-2 rounded-full"
        src={podcast['im:image'][2].label}
        alt={podcast.title.label}
      />
      <header className="text-theme text-center text-lg font-bold">
        {podcast['im:name'].label}
      </header>
      <footer
        className={`
          text-center text-gray-500

          dark:text-gray-400
        `}
      >
        <span>Author:</span> {podcast['im:artist'].label}
      </footer>
    </article>
  );
};

export default PodcastItem;
