import React from 'react';

export const DataHeading = (props) => {
  const { title, className } = props.title;
  return (
    <th scope="col" className={`${className}py-3.5 text-left text-sm font-semibold text-gray-900`}>
      {title}
    </th>
  );
};
