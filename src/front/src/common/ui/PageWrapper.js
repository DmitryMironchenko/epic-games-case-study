import * as React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

const Background = styled.div`
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: ${p => `
    linear-gradient(to bottom, ${rgba('#0C293B', 0.85)}, ${rgba(p.theme.darkerGrey, 0.4)}),
    url('/hero.jpg')
  `};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

const FullPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  font-family: ${p => p.theme.primaryFont};
`

const Wrapper = styled.div`
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  & > * {
    z-index: 2;
  }
  ${Background} {
    z-index: 0;
  }
`

const PageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  order: 0;
  overflow: hidden;
  position: relative;
`

export const PageWrapper = ({ children }) => (
  <FullPage>
    <Wrapper>
      <Background />
      <PageContent>{children}</PageContent>
    </Wrapper>
  </FullPage>
)
