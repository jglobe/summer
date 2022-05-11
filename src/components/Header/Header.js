import PropTypes from 'prop-types';

import { SearchBar } from 'components/SearchBar';
import { ReactComponent as LogoGithub } from 'components/icons/github.svg';

import './Header.css';

export function Header({ onSearchSubmit }) {
  return (
    <header className="header">
      <LogoGithub />
      <SearchBar
        onSubmit={onSearchSubmit}
      />
    </header>
  );
}

Header.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};
