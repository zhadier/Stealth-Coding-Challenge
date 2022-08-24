import React from 'react';
import PropTypes from 'prop-types';
import AccountInfo from './AccountInfo';
import BasicInfo from './BasicInfo';
import CsmInfo from './CsmInfo';

const DataEntry = (props) => {
  const { data } = props;

  return (
    <tr>
      <AccountInfo image={data['Company Logo']} account={data.Account} segment={data.Segments} />
      <BasicInfo value={data.MRR} />
      <CsmInfo name={data['Assigned CSM name']} email={data['Assigned CSM email']} />
      <BasicInfo value={data['Total signals']} />
      <BasicInfo value={data['Company Size']} />
      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
        <a href={data.Website} className="text-indigo-600 hover:text-indigo-900">
          {data.Website}
        </a>
      </td>
      <BasicInfo value={data.Created} />
      <BasicInfo value={data['Last Modified']} />
      <BasicInfo value={data['Renewal date ']} />
    </tr>
  );
};

DataEntry.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default DataEntry;
