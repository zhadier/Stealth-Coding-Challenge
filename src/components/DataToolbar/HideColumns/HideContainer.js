import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import HideItem from './HideItem';

import FilterContext from '../../../Store/filterContext';

const FilterContainer = (props) => {
  const ctx = useContext(FilterContext);

  const { list } = props;

  const headers = useMemo(() => (['MRR', 'Assigned CSM', 'Total Signals', 'Company Size', 'Website', 'Created', 'Last Modified', 'Renewal Date']), [list]);

  const handleHidden = (label) => {
    const action = { type: 'UPDATE HIDDEN', payLoad: label };
    ctx.dispatchView(action);
  };

  return (
    <div className="sm:flex sm:items-center px-5 py-2 pb-5 w-full">
      <div className="flex w-full gap-3 flex-wrap justify-center items-center">
        {headers.map((heading) => (
          <HideItem
            key={heading}
            type={heading}
            hidden={ctx.state.hidden.includes(heading)}
            onHiddenChange={handleHidden}
          />
        ))}
      </div>
    </div>
  );
};

FilterContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default FilterContainer;
