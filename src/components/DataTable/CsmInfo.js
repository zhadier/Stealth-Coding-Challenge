import React from 'react';
import PropTypes from 'prop-types';

const CsmInfo = (props) => {
  const { name, email, phone } = props;

  return (
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <div className="text-gray-900">{name}</div>
      <div className="text-gray-500">{email}</div>
      <div className="text-xs  font-light text-gray-500">{phone}</div>
    </td>
  );
};

CsmInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default CsmInfo;
