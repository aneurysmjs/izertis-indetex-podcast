import { describe, expect, it, vi, beforeAll, afterEach, beforeEach } from 'vitest';
import { act } from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';

import renderWithQueryClient from '@/utils/testUtils/renderWithQueryClient';
import podcastMockData from '@/pages/Home/services/podcastService/podcastMockData';
import Home from './Home';

const { mockGetPodcast, mockUseNavigate } = vi.hoisted(() => ({
  mockGetPodcast: vi.fn(),
  mockUseNavigate: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: mockUseNavigate,
}));

vi.mock('@/pages/Home/services/podcastService', () => ({
  getPodcast: mockGetPodcast,
}));

describe('Home', () => {
  /**
   * Temporarily workaround for bug in @testing-library/react when use user-event with `vi.useFakeTimers()`
   *
   * @see https://github.com/vitest-dev/vitest/issues/3184#issuecomment-1506219115
   */
  beforeAll(() => {
    const _jest = globalThis.jest;

    globalThis.jest = {
      ...globalThis.jest,
      advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
    };

    return () => void (globalThis.jest = _jest);
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should render podcast list', async () => {
    mockGetPodcast.mockResolvedValue(podcastMockData);

    renderWithQueryClient(<Home />);

    await waitFor(() => {
      const podcastItems = screen.getAllByTestId('podcast-item');

      expect(podcastItems).toHaveLength(3);
    });
  });

  it('should filter the podcast list when user types in the search input', async () => {
    mockGetPodcast.mockResolvedValue(podcastMockData);

    renderWithQueryClient(<Home />);

    await waitFor(() => {
      const podcastItems = screen.getAllByTestId('podcast-item');
      expect(podcastItems).toHaveLength(3);
    });

    const input = screen.getByTestId('input-search');

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'T' } });
    fireEvent.change(input, { target: { value: 'Th' } });
    fireEvent.change(input, { target: { value: 'The' } });
    fireEvent.change(input, { target: { value: 'The J' } });
    fireEvent.change(input, { target: { value: 'The Jo' } });
    fireEvent.change(input, { target: { value: 'The Joe' } });

    expect((input as HTMLInputElement).value).toBe('The Joe');

    // here we fullfil useDebounce's timer so value can be reflected on the component's state
    act(() => {
      vi.runAllTimers();
    });

    const podcastItems = screen.getAllByTestId('podcast-item');

    expect(podcastItems).toHaveLength(1);
  });

  it('should display "no results" text when filtering wrong', async () => {
    mockGetPodcast.mockResolvedValue(podcastMockData);

    renderWithQueryClient(<Home />);

    await waitFor(() => {
      const podcastItems = screen.getAllByTestId('podcast-item');
      expect(podcastItems).toHaveLength(3);
    });

    const input = screen.getByTestId('input-search');
    expect(input).toBeDefined();

    fireEvent.change(input, { target: { value: 'q' } });
    fireEvent.change(input, { target: { value: 'qw' } });
    fireEvent.change(input, { target: { value: 'qwe' } });
    fireEvent.change(input, { target: { value: 'qwer' } });
    fireEvent.change(input, { target: { value: 'qwert' } });
    fireEvent.change(input, { target: { value: 'qwerty' } });

    expect((input as HTMLInputElement).value).toBe('qwerty');

    act(() => {
      vi.runAllTimers();
    });

    const podcastItems = screen.queryAllByTestId('podcast-item');

    expect(podcastItems).toHaveLength(0);

    const noResults = screen.getByTestId('no-results');
    expect(noResults).toBeDefined();
  });
});
