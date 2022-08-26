import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import DataTableEntries from './DataTableEntries';
import DataTableHeader from './DataTableHeader';

const DataTable = (props) => {
  const { dataList } = props;
  const tableHeadings = useMemo(() => (['Account', 'MRR', 'Assigned CSM', 'Total Signals', 'Company Size', 'Website', 'Created', 'Last Modified', 'Renewal Date']), [dataList]);
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto">
        <div className="min-w-full py-2 align-middle">
          <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <DataTableHeader headings={tableHeadings} />
              <DataTableEntries entries={dataList} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  dataList: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default DataTable;
