import React from 'react';
import PropTypes from 'prop-types';

const NumberField = (props) => {
  const {
    onSelect, selected,
  } = props;

  return (
    <div className="mt-1 relative min-w-[4rem] max-w-[6rem]">
      <input
        type="number"
        name="number"
        value={selected}
        onChange={onSelect}
        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-2 py-2 text-left cursor-default focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

NumberField.defaultProps = {
  onSelect: () => {},
  selected: '',
};

NumberField.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.string,
};

export default NumberField;
