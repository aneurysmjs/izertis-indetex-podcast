import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import formatReleaseDate from '@/utils/date/formatReleaseDate';
import formatMilliseconds from '@/utils/date/formatMilliseconds';
import useGetEpisodeList from '@/pages/PodcastDescription/hooks/useGetEpisodeList';

const EpisodesList: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: episodes } = useGetEpisodeList(id);

  const handleClick = (trackId: number) => {
    if (id) {
      navigate(`episode/${trackId}`);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center">
        <div className="text-theme ml-4">
          <span>{t('podcast.episodes')}: </span>
          {episodes?.length}
        </div>
      </div>

      <table
        className={`
          relative min-w-full table-auto text-left text-sm font-light
          table--zebra
        `}
      >
        <thead
          className={`
            border-b bg-gray-200 font-medium

            dark:border-slate-700 dark:bg-gray-800
          `}
        >
          <tr>
            <th className="px-6 py-4 text-theme">{t('podcast.title')}</th>
            <th className="px-6 py-4 text-theme">{t('podcast.date')}</th>
            <th className="px-6 py-4 text-theme">{t('podcast.duration')}</th>
          </tr>
        </thead>
        <tbody>
          {episodes?.map((episode) => (
            <tr
              key={episode.trackId}
              data-testid="table-row"
              className={`
                text-theme cursor-pointer border-b bg-white

                dark:border-neutral-600 dark:bg-gray-900
              `}
              onClick={() => {
                handleClick(episode.trackId);
              }}
            >
              <td className="whitespace-nowrap px-6 py-4">{episode.trackName}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {formatReleaseDate(episode.releaseDate)}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {formatMilliseconds(episode.trackTimeMillis)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EpisodesList;
