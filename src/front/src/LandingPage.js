import * as React from 'react'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'

import { Widget, PageHeader, Button, media } from 'common/ui'
import { SearchBar } from './SearchBar'

const ViewWrapper = styled.div`
  text-transform: capitalize;
  background: ${p => p.theme.secondaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.lightGreyColor};
`

const Wrapper = styled.div`
  display: flex;
  color: ${p => p.theme.lightGreyColor};
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  & p {
    margin: 0;
    line-height: 2em;
  }
`

const LandingWrapper = styled.div`
  display: flex;
  width: 65%;
  max-width: 1000px;
  justify-content: space-between;
  overflow: hidden;
  text-transform: uppercase;
  background: transparent;
`

const WidgetImage = styled.img.attrs(p => ({
  src: p.imageSrc
}))`
  width: 250px;
  height: 200px;
  ${media.laptop`
      width: 250px;
  `};
  ${media.tablet`
      width: 110px;
      height: 100px;
  `};
`

const StyledWidget = styled(Widget).attrs({ flexDirection: 'column' })`
  margin: 10px;
  max-width: 250px;
  ${media.laptop`
      width: 250px;
  `};
  ${media.tablet`
      width: 110px;
  `};
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 750px;
  margin-bottom: 40px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${p => p.theme.lightGreyColor};
  &:visited {
    color: ${p => p.theme.lightGreyColor};
  }
  cursor: pointer;
`

export const LandingPage = ({
  history: {
    location: { pathname }
  }
}) => {
  if (pathname !== '/') {
    return <Redirect to="/" />
  } else {
    return (
      <Wrapper>
        <PageHeader style={{ padding: '50px 0px 10px 0px' }}>game data explorer</PageHeader>
        <LandingWrapper>
          <StyledWidget>
            <WidgetImage imageSrc="/beginner.jpg" />
            <ViewWrapper>
              <StyledLink to="players/beginner">
                <h3>view gameplay data</h3>
              </StyledLink>
            </ViewWrapper>
          </StyledWidget>
          <StyledWidget>
            <WidgetImage imageSrc="/intermediate.jpg" />
            <ViewWrapper>
              <StyledLink to="players/intermediate">
                <h3>view gameplay data</h3>
              </StyledLink>
            </ViewWrapper>
          </StyledWidget>
          <StyledWidget>
            <WidgetImage imageSrc="/pro.jpg" />
            <ViewWrapper>
              <StyledLink to="players/pro">
                <h3>view gameplay data</h3>
              </StyledLink>
            </ViewWrapper>
          </StyledWidget>
        </LandingWrapper>
        <SearchBar />
        <ImageContainer>
          <Link to="/docs">
            <Button round wide color="modalOverlayBackground" active>
              Go to project documentation
            </Button>
          </Link>
        </ImageContainer>
      </Wrapper>
    )
  }
}
