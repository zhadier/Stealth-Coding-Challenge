import React from 'react';
import { DataEntry } from './DataEntry';

export const DataTableEntries = (props) => {
  const { entries } = props.entries;
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {entries.map((entry) => (
        <DataEntry key={entry.External_id} />
      ))}
    </tbody>
  );
};
