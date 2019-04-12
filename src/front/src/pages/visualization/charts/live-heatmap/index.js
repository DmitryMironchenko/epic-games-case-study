import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { HeatmapChart } from '..';

const useTicker = (data, interval) => {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        if (frameIndex > data.length - 2) {
          setFrameIndex(0);
        } else {
          setFrameIndex(frameIndex + 1);
        }
      }, interval);

      return () => {
        clearTimeout(handler);
      };
    },
    [data, frameIndex],
  );

  return [data[frameIndex]];
}

const LiveHeatmapChart = ({ data }) => {
  const sample = useTicker(data, 300);

  return <HeatmapChart isLive data={sample} />
};

export default LiveHeatmapChart;
