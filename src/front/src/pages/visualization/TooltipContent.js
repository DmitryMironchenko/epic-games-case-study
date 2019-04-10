import React from 'react';

import { StyledTooltipWrapper } from './styled';

const TooltipContent = ({ tooltipData }) => (
  <StyledTooltipWrapper>
    <p>{tooltipData.killer_guid}</p>
    <p>kills: {tooltipData.kills}</p>
  </StyledTooltipWrapper>
);

export default TooltipContent;
