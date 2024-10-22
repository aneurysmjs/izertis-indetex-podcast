import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

import PodcastEpisode from './PodcastEpisode';

const { mockUseGetEpisode, mockUseParams } = vi.hoisted(() => ({
  mockUseGetEpisode: vi.fn(),
  mockUseParams: vi.fn(),
}));

// Mock the useParams hook
vi.mock('react-router-dom', () => ({
  useParams: mockUseParams,
}));

vi.mock('@/pages/PodcastDescription/hooks/useGetEpisode', () => ({
  default: mockUseGetEpisode,
}));

describe('podcastEpisode', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders podcast episode details when episodeId is valid', () => {
    // Mock useParams to return a valid episodeId
    mockUseParams.mockReturnValue({ episodeId: '2', id: '1' });

    // Mock mockUseGetEpisode to return a valid podcast description
    mockUseGetEpisode.mockReturnValue({
      data: {
        description: 'Episode Description',
        episodeUrl: 'https://example.com/episode.mp3',
        trackName: 'Episode Title',
      },
    });

    // Render the PodcastEpisode component
    const { getByText, queryByTestId } = render(<PodcastEpisode />);

    // Assert that the episode title, description, and audio player are rendered
    expect(getByText('Episode Title')).not.toBeNull();
    expect(getByText('Episode Description')).not.toBeNull();
    expect(queryByTestId('player')).not.toBeNull();
  });

  it('does not render podcast episode details when episodeId is invalid', () => {
    // Mock useParams to return an invalid episodeId
    mockUseParams.mockReturnValue({ episodeId: null });

    // Mock mockUseGetEpisode to return null for podcast description
    mockUseGetEpisode.mockReturnValue({ data: null });

    // Render the PodcastEpisode component
    const { queryByTestId, queryByText } = render(<PodcastEpisode />);

    // Assert that the episode title, description, and audio player are not rendered
    expect(queryByText('Episode Title')).toBeNull();
    expect(queryByText('Episode Description')).toBeNull();
    expect(queryByTestId('player')).toBeNull();
  });
});
