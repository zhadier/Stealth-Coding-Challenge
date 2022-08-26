import React, { useMemo, useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import SelectBox from './Inputs/SelectBox';

const SelectionFilter = (props) => {
  const {
    onRemove, list, mainOptions, onPropertyChange, onConditionChange, onBoundChange, currentKey,
  } = props;

  const [selectProperty, setSelectProperty] = useState(currentKey ? { name: currentKey, id: 0 }
    : undefined);
  const [selectBound, setSelectBound] = useState([]);

  const handleProperty = (value) => {
    setSelectProperty(value);
    onPropertyChange(value.name, currentKey);
  };

  const handleBound = (value) => {
    const newestName = value[value.length - 1].name;
    let newArray = value;
    if (newArray.filter((item) => item.name === newestName).length !== 1) {
      newArray = value.filter((item) => item.name !== newestName);
    }
    setSelectBound(newArray);
    onBoundChange(newArray.map((value) => value.name), currentKey);
  };

  const handleRemove = () => {
    onRemove(currentKey);
  };

  const filterOptions = useMemo(() => (
    // eslint-disable-next-line prefer-spread
    [...new Set([].concat.apply([], list))]
      .map((key, id) => ({ id: (id + 1), name: key }))), [list]);

  useEffect(() => {
    onConditionChange('Equality', currentKey);
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <SelectBox placeHolder="Select Property" options={mainOptions} selected={selectProperty} onSelect={handleProperty} />
      <SelectBox placeHolder="Choose Option" multiple options={filterOptions} selected={selectBound} onSelect={handleBound} />
      <button
        type="button"
        onClick={handleRemove}
        className="inline-flex mt-1 h-4 items-center  border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <XIcon className="h-3 w-3" aria-hidden="true" />
      </button>
    </div>
  );
};

SelectionFilter.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape).isRequired,
  mainOptions: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onPropertyChange: PropTypes.func.isRequired,
  onConditionChange: PropTypes.func.isRequired,
  onBoundChange: PropTypes.func.isRequired,
  currentKey: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default SelectionFilter;
