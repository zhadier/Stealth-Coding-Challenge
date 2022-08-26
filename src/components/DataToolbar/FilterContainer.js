import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  PlusIcon,
} from '@heroicons/react/solid';
import FilterSelector from './FilterSelector';
import FilterContext from '../../Store/filterContext';

const FilterContainer = (props) => {
  const ctx = useContext(FilterContext);

  const [selectedFilters, setSelectedFilters] = useState(ctx.state.currentView.filters);
  const { list } = props;

  const filterOptions = useMemo(() => (Object.keys(list[0])
    .reduce(
      (array, key, id) => {
        if (key === 'Company Logo' || selectedFilters.find((filter) => filter.name === key)) {
          return array;
        }
        array.push({ id: (id + 1), name: key });
        return array;
      }, [],
    )),
  [list, selectedFilters]);

  const handleAdd = () => {
    if (selectedFilters[selectedFilters.length - 1]?.name !== '') {
      setSelectedFilters((state) => ([...state, { name: '', constraint: '', bound: '' }]));
    }
  };

  const handleProperty = (newKey, prevKey) => {
    setSelectedFilters((state) => state.map((filter) => {
      if (filter.name === prevKey) {
        return { name: newKey };
      }
      return filter;
    }));
  };

  const handleCondition = (value, key) => {
    setSelectedFilters((state) => state.map((filter) => {
      if (filter.name === key) {
        return { ...filter, constraint: value };
      }
      return filter;
    }));
  };

  const handleBound = (value, key) => {
    setSelectedFilters((state) => state.map((filter) => {
      if (filter.name === key) {
        return { ...filter, bound: value };
      }
      return filter;
    }));
  };

  const handleSaveFilter = () => {
    const action = { type: 'UPDATE VIEW', payLoad: { viewName: ctx.state.currentView.viewName, filters: selectedFilters } };
    ctx.dispatchView(action);
  };

  const handleRemoveFilter = (key) => {
    setSelectedFilters((state) => state.filter((filter) => (
      filter.name !== key)));
  };

  return (
    <div className="sm:flex sm:items-center px-5 py-2 w-full">
      <div className="flex flex-col w-full">
        {selectedFilters.map((filter) => (
          <FilterSelector
            list={list}
            key={filter.name}
            filterOptions={filterOptions}
            type={filter.name}
            onRemove={handleRemoveFilter}
            onPropertyChange={handleProperty}
            onBoundChange={handleBound}
            onConditionChange={handleCondition}
          />
        ))}
        <div className="w-full flex justify-between pb-3 pt-5">
          <button
            type="button"
            className="flex w-[9rem] items-center px-2 py-1 border-transparent shadow-sm text-xs font-medium border-1 border-gray-300 text-purple-500 bg-white"
            onClick={handleAdd}
          >
            <PlusIcon
              className="mr-2 flex-shrink-0 h-4 w-4 text-purple-500 group-hover:text-white"
            />
            Add Condition
          </button>
          <button
            type="button"
            className="flex w-[7rem] justify-center items-center items-center px-1 border border-transparent shadow-sm text-xs border-1 border-gray-300 text-gray-500 bg-white hover:text-white hover:bg-indigo-700 focus:outline-none "
            onClick={handleSaveFilter}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

FilterContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default FilterContainer;
