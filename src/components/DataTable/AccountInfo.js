import React from 'react';
import PropTypes from 'prop-types';

const AccountInfo = (props) => {
  const { image, account, segment } = props;

  return (
    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
      <div className="flex items-center">
        <div className="h-10 w-10 flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src={image} alt="" />
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{account}</div>
          <div className="text-gray-500">{segment}</div>
        </div>
      </div>
    </td>
  );
};

AccountInfo.propTypes = {
  image: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
  segment: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AccountInfo;
