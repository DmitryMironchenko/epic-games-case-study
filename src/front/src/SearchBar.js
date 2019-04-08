import * as React from 'react'
import styled from 'styled-components'
import request from 'superagent'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedDark } from 'react-syntax-highlighter/dist/styles/hljs'
import { rgba } from 'polished'

import { Loading } from 'common/ui/Icons'
import { Modal, Scrollbars } from 'common/ui'

const Input = styled.input`
  box-shadow: ${p => p.theme.widgetBoxShadow};
  border: ${p => `1px solid ${p.theme.lightGreyColor}`};
  border-radius: ${p => p.theme.buttonBorderRadius};
  background: ${p => p.theme.modalOverlayBackground};
  height: 100%;
  width: 100%;
  margin: auto;
  padding: 8px;
  color: ${p => p.theme.lightGreyColor};
  text-align: center;
  &::placeholder {
    color: ${p => rgba(p.theme.lightGreyColor, 0.3)};
  }
  &:focus {
    box-shadow: 0 0 0px 3px #00d4fc;
  }
`

const DataContainer = styled.div`
  overflow: auto;
  height: 600px;
  width: 100%;
`

const Form = styled.form`
  width: 65%;
  display: flex;
  height: 30px;
  margin: auto;
`

export class SearchBar extends React.Component {
  state = {
    queryData: null,
    status: 'SUCCESS'
  }

  fetchData = sql => {
    this.setState({ status: 'REQUEST' })
    request
      .get('/api/raw')
      .query({ query: sql })
      .then(({ body: queryData }) => this.setState({ queryData, status: 'SUCCESS' }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { search } = e.target.elements
    this.fetchData(search.value)
  }

  render() {
    const { queryData, status } = this.state
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Input
            aria-label="sql-search"
            id="sql-search"
            name="search"
            placeholder="QUERY SQLite DB"
            autoComplete="false"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                this.fetchData(e.target.value)
              }
            }}
          />
        </Form>
        {!queryData && status === 'REQUEST' && <Loading />}
        {queryData && status !== 'REQUEST' && (
          <Modal
            open
            width={1000}
            header="Search Results"
            onClose={() => this.setState({ queryData: null })}
          >
            <DataContainer>
              <Scrollbars>
                <SyntaxHighlighter language="json" style={solarizedDark}>
                  {JSON.stringify(queryData, undefined, '  ')}
                </SyntaxHighlighter>
              </Scrollbars>
            </DataContainer>
          </Modal>
        )}
      </>
    )
  }
}
