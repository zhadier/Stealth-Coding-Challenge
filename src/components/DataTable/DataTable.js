import React from 'react';
import { DataTableEntries } from './DataTableEntries';
import { DataTableHeader } from './DataTableHeader';

export const DataTable = (props) => {
  const { data } = props;
  const tableHeadings = Object.keys(data);
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <tbody className="divide-y divide-gray-200 bg-white">
                <DataTableHeader headings={tableHeadings} />
                <DataTableEntries entries={data} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
