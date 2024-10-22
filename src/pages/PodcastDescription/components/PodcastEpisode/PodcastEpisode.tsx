import { useParams } from 'react-router-dom';

import useGetEpisode from '@/pages/PodcastDescription/hooks/useGetEpisode';

const PodcastEpisode = () => {
  const { episodeId, id } = useParams();
  const { data: episode } = useGetEpisode(id, episodeId);

  return (
    <article
      className={`
        text-theme bg-white p-8 shadow-md

        dark:bg-gray-800 dark:shadow-none
      `}
    >
      {episode ? (
        <>
          <header>
            <h4 className="mb-8 text-xl">{episode.trackName}</h4>
          </header>
          <p>{episode.description}</p>
          <footer>
            <audio data-testid="player" className="mt-8 w-full" controls src={episode.episodeUrl}>
              <track kind="captions" />
            </audio>
          </footer>
        </>
      ) : null}
    </article>
  );
};

export default PodcastEpisode;
