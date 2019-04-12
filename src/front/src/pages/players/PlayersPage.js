import * as React from 'react';
import request from 'superagent';
import { orderBy } from 'lodash';
import { SortDirection } from 'react-virtualized';
import styled from 'styled-components';

import { Select, Widget, PageHeader, Table, Column } from 'common/ui';

const options = ['beginner', 'intermediate', 'pro'];

const SelectWrapper = styled.div`
  width: 35%;
  margin: 17.5rem auto;
`;

const PlayerTypeSelect = ({ handleChange, value, fluid }) => (
  <Select
    options={options}
    value={value}
    fluid={fluid}
    handleChange={handleChange}
    placeholder="Select player type"
    aria-label="select-player-type"
    isSeachable="true"
  />
);

export class PlayersPage extends React.Component {
  state = {
    status: 'SUCCESS',
    data: null,
    sortDirection: SortDirection.ASC,
    sortBy: 'frametime_ms'
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props
    if (!params.playerType) return
    this.fetchData(params.playerType)
  }

  fetchData = value => {
    this.setState({ status: 'REQUEST' })
    request
      .get(`/api/players/${value}/`)
      .then(({ body: data }) => this.setState({ data, status: 'SUCCESS' }))
      .catch(() => this.setState({ status: 'ERROR', message: 'Looks like something went wrong!' }))
  }

  handleChange = value => {
    const {
      match: { params },
      history
    } = this.props

    if (params.playerType !== value) {
      history.push(`/players/${value}`)
    }

    this.fetchData(value)
  }

  sort = ({ sortBy, sortDirection }) => this.setState({ sortDirection, sortBy })

  render() {
    const { data, status, sortDirection, sortBy, message } = this.state
    const {
      match: {
        params: { playerType }
      }
    } = this.props
    return (
      <>
        <PageHeader>Player Data</PageHeader>
        {playerType ? (
          <Widget
            style={{ height: 600, width: '90%', margin: '3rem auto' }}
            header={data && `player: ${data[0].playerguid}`}
            actions={<PlayerTypeSelect handleChange={this.handleChange} value={playerType} />}
            status={status}
            message={message}
          >
            {data && (
              <Table
                rowCount={data.length}
                rowGetter={({ index }) => orderBy(data, sortBy, sortDirection.toLowerCase())[index]}
                height={600}
                rowHeight={40}
                sortDirection={sortDirection}
                sortBy={sortBy}
                sort={this.sort}
                noRowsMessage="Please select a player type"
              >
                <Column width={80} dataKey="framenumber" label="Frame No." />
                <Column width={120} label="Position X" dataKey="posX" flexGrow={1} />
                <Column width={120} label="Position Y" dataKey="posY" flexGrow={1} />
                <Column width={120} label="Position Z" dataKey="posZ" flexGrow={1} />
              </Table>
            )}
          </Widget>
        ) : (
          <SelectWrapper>
            <PlayerTypeSelect fluid handleChange={this.handleChange} value={playerType} />
          </SelectWrapper>
        )}
      </>
    )
  }
}
