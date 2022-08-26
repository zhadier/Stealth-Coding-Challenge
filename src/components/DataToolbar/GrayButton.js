import React from 'react';
import PropTypes from 'prop-types';

const GrayButton = (props) => {
  const { onClick, text, Icon } = props;
  return (
    <button
      type="button"
      className="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-xs font-medium border-1 border-gray-300 text-gray-500 bg-white hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={onClick}
    >
      <Icon
        className="mr-3 flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-white"
      />
      {text}
    </button>
  );
};

GrayButton.defaultProps = {
  onClick: () => {},
};

GrayButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.shape().isRequired,
};

export default GrayButton;
