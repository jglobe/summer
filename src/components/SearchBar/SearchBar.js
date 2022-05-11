import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as IconSearch } from 'components/icons/search.svg';
import { ReactComponent as IconCancel } from 'components/icons/cancel.svg';

import './SearchBar.css';

export function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    onSubmit(value.trim());
  });

  return (
    <form className="search" onSubmit={handleSubmit}>
      <IconSearch
        className="search__icon"
      />
      <input
        type="text"
        className="search__input"
        placeholder="Enter Github username"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      {value && (
        <button
          className="search__clear"
          type="button"
          onClick={() => {
            setValue('');
            onSubmit('');
          }}
        >
          <IconCancel />
        </button>
      )}
    </form>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
