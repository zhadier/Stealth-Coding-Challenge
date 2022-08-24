import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import DataTable from '../DataTable/DataTable';
import DataToolbar from '../DataToolbar/DataToolbar';
import filterChecks from '../../logic/filterChecks';

const CurrentView = (props) => {
  const { currentFilter, data } = props;

  const filteredList = useMemo(() => (
    Object.entries(currentFilter).reduce((array, [key, value]) => array.filter(
      (data) => filterChecks(data[key], value.constraint, value.bound),
    ), [...data])
  ), [currentFilter]);

  return (
    <main className="flex-1 mx-4">
      <div className="py-6">
        <div className="max-w-10xl mx-auto px-2 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{Object.keys(currentFilter)[0]}</h1>
        </div>
        <div className="max-w-7xl mx-auto ">
          <div className="py-4" />
          <div className="py-2 bg-white">
            <DataToolbar
              entryCount={data.length}
              dataKeys={Object.keys(data[0])}
            />
            <DataTable dataList={filteredList} />
          </div>
        </div>
      </div>
    </main>
  );
};

CurrentView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape).isRequired,
  currentFilter: PropTypes.shape(PropTypes.shape).isRequired,
};

export default CurrentView;
