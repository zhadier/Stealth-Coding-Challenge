import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toggle from './Inputs/Toggle';

const HideItem = (props) => {
  const {
    type, hidden, onHiddenChange,
  } = props;

  const [isEnabled, setIsEnabled] = useState(!hidden);

  const handleEnabled = () => {
    setIsEnabled(!isEnabled);
    onHiddenChange(type);
  };

  return (
    <Toggle label={type} enabled={isEnabled} handleEnabled={handleEnabled} />
  );
};

HideItem.propTypes = {
  type: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  onHiddenChange: PropTypes.func.isRequired,
};

export default HideItem;
