import type { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { useNavigate } from 'react-router-dom';

const BackButton: FC = () => {
  const navigate = useNavigate();

  return (
    <button type="button">
      <FontAwesomeIcon
        className="button-base"
        icon={faChevronLeft}
        onClick={() => {
          navigate(-1);
        }}
      />
    </button>
  );
};

export default BackButton;
