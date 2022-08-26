import React, { useMemo, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import SelectBox from './Inputs/SelectBox';
import TextField from './Inputs/TextField';

const StringFilter = (props) => {
  const {
    onRemove, list, mainOptions, onPropertyChange, onConditionChange, onBoundChange, currentKey,
  } = props;

  const [selectProperty, setSelectProperty] = useState(currentKey ? { name: currentKey, id: 0 }
    : undefined);
  const [selectCondition, setSelectCondition] = useState();
  const [selectBound, setSelectBound] = useState('');

  const handleProperty = (value) => {
    setSelectProperty(value);
    onPropertyChange(value.name, currentKey);
  };

  const handleCondition = (value) => {
    setSelectCondition(value);
    onConditionChange(value.name, currentKey);
  };

  const handleRemove = () => {
    onRemove(currentKey);
  };

  const handleBound = (e) => {
    setSelectBound(e.target.value);
    onBoundChange(e.target.value, currentKey);
  };

  const conditions = useMemo(() => (['is', 'is not', 'starts with', 'ends with', 'contains', 'does not contain'].map((key, id) => ({ id: (id + 1), name: key }))), [list]);

  return (
    <div className="flex gap-2 items-center">
      <SelectBox placeHolder="Select Property" options={mainOptions} selected={selectProperty} onSelect={handleProperty} />
      <SelectBox placeHolder="Select Condition" minWidth="8rem" options={conditions} selected={selectCondition} onSelect={handleCondition} />
      <TextField placeHolder="Enter Text" selected={selectBound} onSelect={handleBound} />
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

StringFilter.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape).isRequired,
  mainOptions: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onPropertyChange: PropTypes.func.isRequired,
  onConditionChange: PropTypes.func.isRequired,
  onBoundChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  currentKey: PropTypes.string.isRequired,
};

export default StringFilter;
