import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import PodcastSidebar from '@/pages/PodcastDescription/components/PodcastSidebar';
import BackButton from '@/pages/PodcastDescription/components/BackButton';

const PodcastDescription: FC = () => {
  return (
    <section className="my-8">
      <div
        className={`
          mx-auto flex w-full flex-col

          lg:w-8/12
        `}
      >
        <div className="mb-8">
          <BackButton />
        </div>
        <div
          className={`
            flex flex-col justify-between

            lg:flex-row
          `}
        >
          <div
            className={`
              w-full flex-none

              lg:mr-4 lg:w-80
            `}
          >
            <PodcastSidebar />
          </div>

          <div className={`flex-auto w-200`}>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastDescription;
