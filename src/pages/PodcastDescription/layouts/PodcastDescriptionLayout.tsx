import type { FC, ReactElement } from 'react';

import BackButton from '@/pages/PodcastDescription/components/BackButton';

interface PodcastDescriptionLayoutProps {
  content: ReactElement;
  sidebar: ReactElement;
}

const PodcastDescriptionLayout: FC<PodcastDescriptionLayoutProps> = ({ content, sidebar }) => {
  return (
    <section
      className={`
        container mx-auto my-8 px-4

        lg:px-0
      `}
    >
      <div className={`mx-auto flex w-full flex-col`}>
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
            {sidebar}
          </div>

          <div className={`flex-auto w-200 overflow-x-scroll`}>{content}</div>
        </div>
      </div>
    </section>
  );
};

export default PodcastDescriptionLayout;
