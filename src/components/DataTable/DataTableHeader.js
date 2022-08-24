import React from 'react';
import PropTypes from 'prop-types';
import DataHeading from './DataHeading';

const DataTableHeader = (props) => {
  const { headings } = props;
  return (
    <thead className="bg-gray-50">
      <tr>
        {headings.map((key, index) => <DataHeading key={key} title={key} className={index === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-3'} />)}
      </tr>
    </thead>
  );
};

DataTableHeader.propTypes = {
  headings: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default DataTableHeader;
