import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FilterContext from '../../Store/filterContext';

import AccountInfo from './AccountInfo';
import BasicInfo from './BasicInfo';
import CsmInfo from './CsmInfo';

const DataEntry = (props) => {
  const { data } = props;

  const { hidden } = useContext(FilterContext).state;
  console.log(hidden);
  return (
    <tr>
      {!hidden.includes('Account') && <AccountInfo image={data['Company Logo']} account={data.Account} segment={data.Segments} />}
      {!hidden.includes('MRR') && <BasicInfo value={data.MRR} />}
      {!hidden.includes('Assigned CSM') && <CsmInfo name={data['Assigned CSM name']} phone={data['Phone Number']} email={data['Assigned CSM email']} />}
      {!hidden.includes('Total Signals') && <BasicInfo value={data['Total signals']} />}
      {!hidden.includes('Company Size') && <BasicInfo value={data['Company Size']} />}
      {!hidden.includes('Website') && (
      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
        <a href={data.Website} className="text-indigo-600 hover:text-indigo-900">
          {data.Website}
        </a>
      </td>
      )}
      {!hidden.includes('Created') && <BasicInfo value={data.Created} />}
      {!hidden.includes('Last Modified') && <BasicInfo value={data['Last Modified']} />}
      {!hidden.includes('Renewal Date') && <BasicInfo value={data['Renewal date ']} />}
    </tr>
  );
};

DataEntry.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default DataEntry;
