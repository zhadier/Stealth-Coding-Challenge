import React, { useState } from 'react';
import {
  FilterIcon,
  PencilIcon,
} from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import GrayButton from './GrayButton';

const DataToolbar = (props) => {
  const { dataKeys, entryCount } = props;

  const [showFilter, setShowFilter] = useState(false);

  const handleFilter = () => {
    setShowFilter((state) => !state);
  };

  return (
    <div className="sm:flex sm:items-center px-5 pt-2">
      <div className="sm:flex-auto">
        <h2 className="text-md font-normal text-gray-800">
          {entryCount}
          {' '}
          accounts with Profiles
        </h2>
      </div>
      <div className="mt-2 flex gap-2">
        <GrayButton onClick={handleFilter} text={!showFilter ? 'Show Filters' : 'Hide Filters'} Icon={FilterIcon} />
        <GrayButton text="Edit Columns" Icon={PencilIcon} />
        <SearchBar />
      </div>
    </div>
  );
};

DataToolbar.propTypes = {
  dataKeys: PropTypes.arrayOf(PropTypes.shape).isRequired,
  entryCount: PropTypes.number.isRequired,
};

export default DataToolbar;
