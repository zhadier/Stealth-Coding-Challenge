import React from 'react';
import PropTypes from 'prop-types';

const BaicInfo = (props) => {
  const { value } = props;

  return (
    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{value}</td>
  );
};

BaicInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any.isRequired,
};

export default BaicInfo;
