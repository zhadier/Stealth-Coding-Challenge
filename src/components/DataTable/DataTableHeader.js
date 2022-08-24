import React from 'react';
import { DataHeading } from './DataHeading';

export const DataTableHeader = (props) => {
  const { heading } = props;
  return (
    <thead className="bg-gray-50">
      <tr>
        {headings.map((key) => <DataHeading title={key} className={key === 'Name' ? 'pl-4 pr-3 sm:pl-6' : 'px-3'} />)}
      </tr>
    </thead>
  );
};
