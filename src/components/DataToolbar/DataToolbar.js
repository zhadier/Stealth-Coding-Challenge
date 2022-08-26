import React, { useState } from 'react';
import {
  FilterIcon,
  PencilIcon,
} from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import GrayButton from './GrayButton';
import FilterContainer from './Filter/FilterContainer';
import HideContainer from './HideColumns/HideContainer';

const DataToolbar = (props) => {
  const { entryCount, dataList } = props;

  const [showFilter, setShowFilter] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

  const handleFilter = () => {
    setShowFilter((state) => !state);
    setShowHidden(false);
  };

  const handleHidden = () => {
    setShowHidden((state) => !state);
    setShowFilter(false);
  };

  return (
    <>
      <div className="sm:flex sm:items-center px-5 py-2">
        <div className="sm:flex-auto">
          <h2 className="text-md font-normal text-gray-800">
            {entryCount}
            {' '}
            accounts with Profiles
          </h2>
        </div>
        <div className="mt-2 flex gap-2">
          <GrayButton onClick={handleFilter} text={!showFilter ? 'Show Filters' : 'Hide Filters'} Icon={FilterIcon} />
          <GrayButton onClick={handleHidden} text="Edit Columns" Icon={PencilIcon} />
          <SearchBar />
        </div>

      </div>
      {showFilter && <FilterContainer list={dataList} />}
      {showHidden && <HideContainer list={dataList} />}
    </>
  );
};

DataToolbar.propTypes = {
  entryCount: PropTypes.number.isRequired,
  dataList: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default DataToolbar;
