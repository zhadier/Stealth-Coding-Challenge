import React from 'react';
import PropTypes from 'prop-types';
import DataEntry from './DataEntry';

const DataTableEntries = (props) => {
  const { entries } = props;
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {entries.map((entry) => (
        <DataEntry key={entry.Account} data={entry} />
      ))}
    </tbody>
  );
};

DataTableEntries.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default DataTableEntries;
