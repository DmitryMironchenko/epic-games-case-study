// @flow

import * as React from 'react';
import request from 'superagent';
import _ from 'lodash';
import { withTheme } from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Widget } from 'common/ui';

import { HeatmapChart, BarChart } from './charts';
import { StyledVizWrapper } from './styled';
import VizTypeSelect from './VizTypeSelect';

type Props = {
  match: {
    params: {
      vizType: string,
      playerType: string,
    },
  },
  history: {
    push: (string) => void,
  },
};

type State = {
  status: ?string,
  message: ?string,
  data: ?any,
};

const VIZ_TYPES = {
  KILLS: 'kills',
  KILLS_BY_WEAPON: 'kills-by-weapon',
  MOVEMENT: 'movement'
};

const DATA_URLS = {
  [VIZ_TYPES.KILLS]: 'players/kills',
  [VIZ_TYPES.MOVEMENT]: 'game/frame/',
  [VIZ_TYPES.KILLS_BY_WEAPON]: 'weapons/kills',
};

class Visualization extends React.Component<Props, State> {
  state = {
    status: 'SUCCESS',
    message: null,
    data: null,
  }

  componentDidMount() {
    const {
      match: {
        params: { vizType }
      }
    } = this.props;

    this.fetchData(vizType)
  }

  fetchData = async (vizType: $Values<typeof VIZ_TYPES>) => {
    this.setState({ status: 'REQUEST', data: null });

    try {
      const { body: data } = await request.get(`/api/${DATA_URLS[vizType] || 'players/kills'}`);
      this.setState({ status: 'SUCCESS', data });
    } catch (e) {
      this.setState({ status: 'ERROR', message: 'Looks like something went wrong!' });
    }
  }

  getVisualization = (data, vizType: $Values<typeof VIZ_TYPES>) => {
    if (!data) return null

    switch (vizType) {
      case 'kills': {
        return (
          <BarChart data={data} />
        )
      }
      case 'kills-by-weapon': {
        return (
          <BarChart data={data} xKey="weapon" dataKey="kills" />
        )
      }
      case 'movement': {
        return <HeatmapChart data={data} />
      }
      default:
        return null
    }
  };

  handleChange = value => {
    const {
      match: { params },
      history,
    } = this.props

    if (params.playerType !== value) {
      history.push(`/visualization/${value}`)
    }

    this.fetchData(value)
  };

  render() {
    const {
      match: {
        params: { vizType }
      }
    } = this.props
    const { data, status, message } = this.state
    return (
      <StyledVizWrapper>
        {!vizType && <Redirect to="/visualization/kills" />}
        {vizType === VIZ_TYPES.MOVEMENT && (
          <>
            <p>This is a map of all player movement for one match</p>
            <p>Each color represents a different player</p>
          </>
        )}
        <Widget
          header="Data visualization"
          padding="15px"
          status={status}
          message={message}
          style={{ height: 700, width: vizType === VIZ_TYPES.MOVEMENT ? 800 : '90%', margin: 'auto' }}
          actions={<VizTypeSelect options={_.values(VIZ_TYPES)} value={vizType} handleChange={this.handleChange} />}
        >
          {this.getVisualization(data, vizType)}
        </Widget>
      </StyledVizWrapper>
    )
  }
}

export default withTheme(Visualization);
