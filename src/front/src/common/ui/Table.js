import * as React from 'react'
import styled from 'styled-components'
import 'react-virtualized/styles.css'
import {
  AutoSizer,
  Table as VirtualizedTable,
  Column as VirtualizedColumn
} from 'react-virtualized'
import { get } from 'lodash'
import { rgba, lighten } from 'polished'
import { Scrollbars } from 'common/ui'

const TableWrapper = styled.div`
  height: ${p => p.windowScroller || '100%'};
  width: 100%;
  flex: 1;
  line-height: initial;

  .ReactVirtualized__Table__Grid {
    outline: none;
  }

  .ReactVirtualized__Table__headerRow {
    text-transform: initial;
    font-weight: initial;
    font-family: ${p => p.theme.primaryFont};
    color: ${p => rgba(p.theme.lightColor, 0.7)};
    background: #343434;
    border-bottom: 1px solid;
  }

  .ReactVirtualized__Table__headerTruncatedText {
    font-size: 0.8em;
  }

  .ReactVirtualized__Table__headerRow.primary {
    background: ${p => p.theme.primaryColor};
    color: ${p => p.theme.lightColor};
  }

  .ReactVirtualized__Table__row {
    background: ${p => rgba(p.theme.primaryColor, 0.15)};
    color: ${p => p.theme.lightColor};
    border-bottom: 2px solid ${p => rgba(p.theme.lightGreyColor, 0.3)};
    &:hover {
      background: ${p => rgba(lighten(0.35, p.theme.secondaryColor), 0.65)};
      border-radius: ${p => p.theme.borderRadius};
    }
  }
`
class ScrollbarsTable extends React.Component {
  state = { scrollTop: 0 }

  handleScroll = ({ target: { scrollTop } }) => {
    this.setState({ scrollTop })
  }

  render() {
    const { scrollTop } = this.state
    const {
      width,
      height,
      headerHeight,
      tableRef,
      rowCount,
      afterTableContent,
      ...props
    } = this.props

    return (
      <Scrollbars style={{ height, width }} onScroll={this.handleScroll}>
        <VirtualizedTable
          autoHeight={Boolean(rowCount)}
          height={height}
          scrollTop={scrollTop}
          width={width}
          ref={tableRef}
          headerHeight={headerHeight}
          disableHeader
          rowCount={rowCount}
          {...props}
        />
        {afterTableContent}
      </Scrollbars>
    )
  }
}

export const Table = ({
  noRowsMessage,
  tableRef,
  onResize,
  headerHeight,
  disableHeader,
  ...props
}) => {
  return (
    <TableWrapper>
      <AutoSizer onResize={onResize}>
        {({ height, width }) => (
          <>
            {!disableHeader && (
              <VirtualizedTable
                {...props}
                width={width}
                height={headerHeight}
                headerHeight={headerHeight}
                rowCount={0}
              />
            )}
            <ScrollbarsTable
              noRowsMessage={noRowsMessage}
              tableRef={tableRef}
              height={disableHeader ? height : height - headerHeight}
              width={width}
              headerHeight={headerHeight}
              {...props}
            />
          </>
        )}
      </AutoSizer>
    </TableWrapper>
  )
}

Table.defaultProps = {
  noRowsMessage: 'No rows.',
  windowScroller: false,
  rowHeight: 40,
  headerHeight: 40
}

const cellDataGetter = ({ dataKey, rowData }) => {
  if (typeof rowData.get === 'function') {
    return rowData.get(dataKey)
  } else {
    return get(rowData, dataKey)
  }
}

export class Column extends VirtualizedColumn {
  static defaultProps = {
    ...VirtualizedColumn.defaultProps,
    cellDataGetter
  }
}
