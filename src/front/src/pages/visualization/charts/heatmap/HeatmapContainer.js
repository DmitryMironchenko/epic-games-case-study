import _ from 'lodash';
import React from 'react';

import { getUniqColor } from 'common/utils';
import Heatmap from './Heatmap';

const processHeatMapData = data =>
  _.orderBy(data, 'framenumber').map(dataObj => ({
    frameNumber: dataObj.framenumber,
    frames: JSON.parse(dataObj.frame).map(frame => ({
      ...frame,
      color: getUniqColor(frame.guid)
    }))
  }));

const HeatmapContainer= ({ data, isLive }) => ((
  <Heatmap data={processHeatMapData(data)} isLive={isLive}/>
));

export default HeatmapContainer;
