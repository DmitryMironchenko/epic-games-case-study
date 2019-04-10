import React from 'react';

import { Select } from 'common/ui';

const VizTypeSelect = ({ handleChange, value, fluid, options }) => (
  <Select
    options={options}
    fluid={fluid}
    handleChange={handleChange}
    value={value}
    aria-label="visualization-type"
  />
);

export default VizTypeSelect;
