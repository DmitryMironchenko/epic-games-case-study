import React from 'react';
import { ChartArea, BarChart as Bar } from 'viiksetjs';

import TooltipContent from '../../TooltipContent';

const BarChart = ({ data, xKey = 'killer_guid', dataKey='kills' }) => ((
  <ChartArea
    data={data}
    xKey={xKey}
    color="lightGreyColor"
    nogrid
    tooltipStyles={{ wrapper: { position: 'absolute', top: 150 } }}
    formatX={d => d}
    tooltipContent={TooltipContent}
    noYAxis
    type="ordinal"
  >
    <Bar dataKey={dataKey} barProps={{ fill: 'secondaryColor' }} />
</ChartArea>
));

export default BarChart;
