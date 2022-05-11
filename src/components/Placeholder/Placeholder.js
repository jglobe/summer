import PropTypes from 'prop-types';

import './Placeholder.css';

export function Placeholder({ Icon, children }) {
  return (
    <div className="placeholder">
      <Icon className="placeholder__icon" />
      <div className="placeholder__title">
        {children}
      </div>
    </div>
  );
}

Placeholder.propTypes = {
  children: PropTypes.node.isRequired,
  Icon: PropTypes.elementType.isRequired,
};
