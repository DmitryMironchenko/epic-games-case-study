import * as React from 'react'
import request from 'superagent'
import { orderBy } from 'lodash'
import { withTheme } from 'styled-components'
import { Redirect } from 'react-router-dom'
import { ChartArea, BarChart } from 'viiksetjs'
import styled from 'styled-components'

import { Widget, Select } from 'common/ui'
import { getUniqColor } from 'common/utils'
import { Heatmap } from './Heatmap'

const VizWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  color: ${p => p.theme.lightGreyColor};
  & p {
    margin: 0;
    line-height: 2em;
  }
`

const TooltipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const processHeatMapData = data =>
  orderBy(data, 'framenumber').map(dataObj => ({
    frameNumber: dataObj.framenumber,
    frames: JSON.parse(dataObj.frame).map(frame => ({
      ...frame,
      color: getUniqColor(frame.guid)
    }))
  }))

const TooltipContent = ({ tooltipData }) => (
  <TooltipWrapper>
    <p>{tooltipData.killer_guid}</p>
    <p>kills: {tooltipData.kills}</p>
  </TooltipWrapper>
)

const options = ['kills', 'movement']

const DATA_URLS = {
  kills: 'players/kills',
  movement: 'game/frame/'
}

const VizTypeSelect = ({ handleChange, value, fluid }) => (
  <Select
    options={options}
    fluid={fluid}
    handleChange={handleChange}
    value={value}
    aria-label="visualization-type"
  />
)

class Visualization extends React.Component {
  state = {
    status: 'SUCCESS',
    data: null
  }

  componentDidMount() {
    const {
      match: {
        params: { vizType }
      }
    } = this.props
    this.fetchData(vizType)
  }

  fetchData = value => {
    this.setState({ status: 'REQUEST', data: null })
    request
      .get(`/api/${DATA_URLS[value] || 'players/kills'}`)
      .then(({ body: data }) => this.setState({ status: 'SUCCESS', data }))
      .catch(() => this.setState({ status: 'ERROR', message: 'Looks like something went wrong!' }))
  }

  getVisualization = data => {
    const {
      match: {
        params: { vizType }
      }
    } = this.props
    if (!data) return null

    switch (vizType) {
      case 'kills': {
        return (
          <ChartArea
            data={data}
            xKey="killer_guid"
            color="lightGreyColor"
            nogrid
            tooltipStyles={{ wrapper: { position: 'absolute', top: 150 } }}
            formatX={d => d}
            tooltipContent={TooltipContent}
            noYAxis
            type="ordinal"
          >
            <BarChart dataKey="kills" barProps={{ fill: 'secondaryColor' }} />
          </ChartArea>
        )
      }
      case 'movement': {
        return <Heatmap data={processHeatMapData(data)} />
      }
      default:
        return null
    }
  }

  handleChange = value => {
    const {
      match: { params },
      history
    } = this.props

    if (params.playerType !== value) {
      history.push(`/visualization/${value}`)
    }

    this.fetchData(value)
  }

  render() {
    const {
      match: {
        params: { vizType }
      }
    } = this.props
    const { data, status, message } = this.state
    return (
      <VizWrapper>
        {!vizType && <Redirect to="/visualization/kills" />}
        {vizType === 'movement' && (
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
          style={{ height: 700, width: vizType === 'movement' ? 800 : '90%', margin: 'auto' }}
          actions={<VizTypeSelect value={vizType} handleChange={this.handleChange} />}
        >
          {this.getVisualization(data)}
        </Widget>
      </VizWrapper>
    )
  }
}

export const VisualizationPage = withTheme(Visualization)
