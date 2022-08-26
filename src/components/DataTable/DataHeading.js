import React from 'react';
import PropTypes from 'prop-types';

const DataHeading = (props) => {
  const { title, className } = props;

  return (
    <th scope="col" className={`${className} py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500`}>
      {title}
    </th>
  );
};

DataHeading.defaultProps = {
  className: '',
};

DataHeading.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default DataHeading;
