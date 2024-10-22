import { type ChangeEvent, type FC, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';

interface PodcastItemProps {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

const SearchInput: FC<PodcastItemProps> = ({ onChange, onClear = () => undefined }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    onClear();
  };

  return (
    <span className="relative">
      <input
        ref={inputRef}
        data-testid="input-search"
        placeholder="filter by"
        className="input mr-0 pr-6"
        onChange={onChange}
      />
      <button
        type="button"
        onClick={handleClear}
        // eslint-disable-next-line readable-tailwind/multiline
        className={`
          absolute right-2 top-2
        `}
      >
        <FontAwesomeIcon className="text-theme" icon={faXmark} />
      </button>
    </span>
  );
};

export default SearchInput;
