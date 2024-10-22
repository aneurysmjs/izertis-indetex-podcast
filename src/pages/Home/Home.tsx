import { type FC, type ChangeEvent, type MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import isEmpty from 'ramda/src/isEmpty';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import PodcastItem from '@/pages/Home/components/PodcastItem';
import useFilterable from '@/hooks/useFilterable';
import useDebounce from '@/hooks/useDebounce';
import type { Podcast } from '@/entities';
import { getPodcast } from '@/services/podcastService';
import HomeLayout from '@/pages/Home/layouts/HomeLayout';

const searchByTitle = (item: Podcast, filterVal: string) =>
  item.title.label.toLowerCase().includes(filterVal.toLowerCase());

const getPodcastId = (el: HTMLElement | null): null | string => {
  if (el === null) {
    return null;
  }

  if (el.dataset.podcastId) {
    return el.dataset.podcastId;
  }

  return getPodcastId(el.parentElement);
};

const Home: FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const { data: podcastResponse, isLoading } = useQuery({
    queryFn: getPodcast,
    queryKey: ['podcastList'],
    staleTime: Infinity,
  });

  const filteredPodcast = useFilterable(
    podcastResponse?.data.feed.entry ?? [],
    search,
    searchByTitle,
  );

  const handleChange = useDebounce<ChangeEvent<HTMLInputElement>>((evt) => {
    if (evt) {
      const { value } = evt.target as HTMLInputElement;

      setSearch(value);
    }
  });

  const handleClick = (evt: MouseEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLDivElement;

    const id = getPodcastId(target);

    if (id) {
      navigate(`podcast/${id}`);
    }
  };

  const shouldDisplayNoResultsText = !isLoading && search && isEmpty(filteredPodcast);

  return (
    <HomeLayout>
      <div
        className={`
          mb-8 flex items-center justify-center

          lg:mb-4 lg:justify-end
        `}
      >
        <span className="text-theme self-middle">{filteredPodcast.length}</span>
        <input
          data-testid="input-search"
          placeholder="filter by"
          className="input mr-0"
          onChange={handleChange}
        />
      </div>
      <div
        className={`
          flex flex-col flex-wrap items-center justify-between gap-6

          lg:flex-row lg:flex-wrap
        `}
        onClick={handleClick}
      >
        {filteredPodcast.map((podcastItem) => (
          <PodcastItem key={podcastItem.id.attributes['im:id']} podcast={podcastItem} />
        ))}
      </div>
      {shouldDisplayNoResultsText ? (
        <div className="mt-4 text-theme pt-5 text-center" data-testid="no-results">
          {t('notResultsFound')} &quot;{search}&quot;
        </div>
      ) : null}
    </HomeLayout>
  );
};

export default Home;
