import React from 'react';
import PropTypes from 'prop-types';
import StringFilter from './Filters/StringFilter';
import SelectionFilter from './Filters/SelectionFilter';
import NumericalFilter from './Filters/NumericalFilter';
import DateFilter from './Filters/DateFilter';

const FilterSelector = (props) => {
  const {
    filterOptions, type, list,
    onPropertyChange, onConditionChange,
    onBoundChange, onRemove,
  } = props;

  const numbers = ['MRR', 'Total signals'];
  const dates = ['Created', 'Renewal date ', 'Last Modified'];
  const small = ['Segments', 'Company Size'];

  if (small.includes(type)) {
    return (
      <SelectionFilter
        list={list.map((items) => items[type])}
        mainOptions={filterOptions}
        currentKey={type}
        onPropertyChange={onPropertyChange}
        onBoundChange={onBoundChange}
        onConditionChange={onConditionChange}
        onRemove={onRemove}
      />
    );
  }

  if (numbers.includes(type)) {
    return (
      <NumericalFilter
        list={list.map((items) => items[type])}
        mainOptions={filterOptions}
        currentKey={type}
        onPropertyChange={onPropertyChange}
        onBoundChange={onBoundChange}
        onConditionChange={onConditionChange}
        onRemove={onRemove}
      />
    );
  }

  if (dates.includes(type)) {
    return (
      <DateFilter
        list={list.map((items) => items[type])}
        mainOptions={filterOptions}
        currentKey={type}
        onPropertyChange={onPropertyChange}
        onBoundChange={onBoundChange}
        onConditionChange={onConditionChange}
        onRemove={onRemove}
      />
    );
  }

  return (
    <StringFilter
      list={list.map((items) => items[type])}
      mainOptions={filterOptions}
      currentKey={type}
      onPropertyChange={onPropertyChange}
      onBoundChange={onBoundChange}
      onConditionChange={onConditionChange}
      onRemove={onRemove}
    />

  );
};

FilterSelector.propTypes = {
  type: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape).isRequired,
  filterOptions: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onPropertyChange: PropTypes.func.isRequired,
  onConditionChange: PropTypes.func.isRequired,
  onBoundChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FilterSelector;
