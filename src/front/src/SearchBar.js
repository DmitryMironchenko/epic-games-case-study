import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import request from 'superagent';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedDark } from 'react-syntax-highlighter/dist/styles/hljs';
import { rgba } from 'polished';

import { Loading } from 'common/ui/Icons';
import { Modal, Scrollbars, Table, Column } from 'common/ui';

const StyledInput = styled.input`
  box-shadow: ${p => p.theme.widgetBoxShadow};
  border: ${p => `1px solid ${p.theme.lightGreyColor}`};
  border-radius: ${p => p.theme.buttonBorderRadius};
  background: ${p => p.theme.modalOverlayBackground};
  height: 100%;
  width: 100%;
  margin: auto;
  padding: 8px;
  padding-right: 3.65rem;
  color: ${p => p.theme.lightGreyColor};
  text-align: center;
  &::placeholder {
    color: ${p => rgba(p.theme.lightGreyColor, 0.3)};
  }
  &:focus {
    box-shadow: 0 0 0px 3px #00d4fc;
  }
`;

const StyledDataContainer = styled.div`
  overflow: auto;
  height: 600px;
  width: 100%;
`;

const StyledForm = styled.form`
  position: relative;
  width: 65%;
  display: flex;
  height: 30px;
  magin: auto;
`;

const StyledHistoryButton = styled.a`
  position: absolute;

  /* These are set relative to the height of the input box to bound the box neatly inside. This is aesthetic to me but you may change the dimensions of course. */
  right: 0.3rem;
  top: 0.3rem;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 0.3rem;

  /* content in the icon div is centered, without bootstrap or font-awesome you may wish to add your own text in the span */
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  border:none;
  background: transparent;
`;

export const SearchBar = props => {
  const [query, setQuery] = useState('');
  const [queryData, setQueryData] = useState(null);
  const [queryHistoryData, setQueryHistoryData] = useState([]);
  const [status, setStatus] = useState('SUCCESS');

  const handleSubmit = e => {
    console.log('[INFO]: handleSubmit', status, query);
    e.preventDefault();
    return false;
  };

  useEffect(() => {
    (async () => {
      console.log('[INFO] useEffect: ', query, status);
      if (!query || status !== 'REQUEST') return;

      const { body } = await request
        .get('/api/raw')
        .query({ query });

      setQueryData(body);
      setStatus('SUCCESS');
    })();
  }, [query, status]);

  useEffect(() => {
    (async () => {
      if (status !== 'HISTORY') return;
      const { body } = await request.get('/api/raw/history');
      setQueryHistoryData(body);
    })();
  }, [status, setQueryHistoryData.length]);

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          aria-label="sql-search"
          id="sql-search"
          name="search"
          placeholder="QUERY SQLite DB"
          autoComplete="off"
          value={query}
          onChange={e => {setQuery(e.target.value)}}
          onKeyDown={(e => {
            if (e.key === 'Enter') {
              setStatus('REQUEST');

              console.log('[INFO] enter hit', query, status);
            }
          }).bind(this)}
        />
        <StyledHistoryButton onClick={() => { console.log('[INFO]: history button onClick');setStatus('HISTORY') }}>H</StyledHistoryButton>
      </StyledForm>
      {!queryData && status === 'REQUEST' && <Loading />}
      {queryData && status !== 'REQUEST' && (
        <Modal
          open
          width={1000}
          header="Search Results"
          onClose={() => setQueryData(null)}
        >
          <StyledDataContainer>
            <Scrollbars>
              <SyntaxHighlighter language="json" style={solarizedDark}>
                {JSON.stringify(queryData, undefined, '  ')}
              </SyntaxHighlighter>
            </Scrollbars>
          </StyledDataContainer>
        </Modal>
      )}
      {status === 'HISTORY' && (
        <Modal
          open
          width={1000}
          header="Query History"
          onClose={() => {setStatus(null); setQueryData(null)}}
        >
          <Table
            rowCount={queryHistoryData.length}
            rowGetter={({ index }) => queryHistoryData[index]}
            height={600}
            rowHeight={40}
            noRowsMessage="No history available"
            onRowClick={({ event, index, rowData }) => {setQuery(rowData.query); setStatus('REQUEST')}}
          >
            <Column width={80} dataKey="query_id" label="ID" />
            <Column width={120} label="Query" dataKey="query" flexGrow={1} />
          </Table>

        </Modal>
      )}
    </>
  );
}
