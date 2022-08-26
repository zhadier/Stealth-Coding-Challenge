import React from 'react';
import PropTypes from 'prop-types';

const TextField = (props) => {
  const {
    onSelect, selected, placeHolder,
  } = props;

  return (
    <div className="mt-1 relative min-w-[8rem] max-w-[15rem]">
      <input
        type="text"
        name="Text"
        value={selected}
        onChange={onSelect}
        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeHolder}
      />
    </div>
  );
};

TextField.defaultProps = {
  onSelect: () => {},
  selected: '',
  placeHolder: '',
};

TextField.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.string,
  placeHolder: PropTypes.string,
};

export default TextField;
