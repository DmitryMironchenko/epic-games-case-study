import * as React from 'react'
import styled from 'styled-components'
import { rgba, darken, lighten } from 'polished'

import { Widget, Scrollbars } from 'common/ui'
import docs from 'DOCS.md'

const MarkdownWrapper = styled.div.attrs({
  dangerouslySetInnerHTML: { __html: docs }
})`
  width: 100%;
  margin: auto;
  background: ${p => rgba(p.theme.secondaryColor, 0.5)};
  color: ${p => p.theme.lightGreyColor};
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  & > * {
    width: 85%;
    height: 100%;
  }
  h1 {
    text-align: center;
  }
  h2,
  h3,
  p {
    margin: none;
    margin-left: 15px;
    display: inline-block;
  }

  & * > a {
    text-decoration: underline;
    font-weight: bold;
    color: ${p => p.theme.lightColor};
    & :hover {
      ${p => p.theme.lightGreyColor};
    }
  }
  h3 {
    color: ${p => p.theme.lightColor};
    font-style: italic;
  }
  thead {
    background: ${p => darken(0.35, p.theme.primaryColor)};
    tr,
    th {
      padding: 5px;
    }
  }
  td {
    padding: 5px;
  }
  tr:nth-of-type(even) {
    background: ${p => lighten(0.05, rgba(p.theme.secondaryColor, 0.85))};
  }
  td {
    border-radius: ${p => p.theme.borderRadius};
  }
`

export const DocsPage = () => (
  <Widget
    style={{ width: '85%', margin: 'auto', height: 700, overflowX: 'hidden' }}
    header="Documentation"
  >
    <Scrollbars>
      <MarkdownWrapper />
    </Scrollbars>
  </Widget>
)
