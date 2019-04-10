import * as React from 'react'
import { Switch, Route, NavLink, Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { darken, lighten } from 'polished'

import { LandingPage } from './LandingPage'
import { DocsPage } from './DocsPage'
import VisualizationPage from './pages/visualization'
import { SearchBar } from './SearchBar'
import { PlayersPage } from './PlayersPage'
import { Modal, PageWrapper } from 'common/ui'
import { DataReportIcon, ChartsIcon, PlayersIcon } from 'common/ui/Icons'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
`

const grow = keyframes`
  from {
      transform: scaleY(0.9) scaleX(0.9);
  }
  to {
    transform: scaleY(1) scaleX(1);
  }
`

const Tip = styled.div`
  background: ${p => p.theme.modalOverlayBackground};
  color: ${p => p.theme.lightGreyColor};
  border-radius: ${p => p.theme.borderRadius};
  animation: ${grow} 0.4s linear;
  padding: 10px;
  text-align: center;
  position: absolute;
  bottom: 0rem;
  right: 0rem;
  font-size: 12px;
  box-shadow: ${p => p.theme.widgetBoxShadow};
  kbd {
    background: ${p => p.theme.modalOverlayBackground};
    color: ${p => p.theme.lightColor};
    padding: 2px;
    border-radius: ${p => p.theme.borderRadius};
  }
`

const StyledLink = styled(Link)`
  color: ${p => p.theme.lightGreyColor};
  text-decoration: none;
  &:visited {
    color: ${p => p.theme.lightGreyColor};
  }
`

const SidebarNavIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  flex-direction: column;
  height: 50px;
  width: 60px;
  @media (max-width: 800px) {
    height: inherit;
    width: inherit;
  }
`

const Sidebar = styled.div`
  background: ${p => p.theme.secondaryColor};
  color: ${p => p.theme.lightGreyColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 60px;
  ${SidebarNavIcon} {
    color: ${p => p.theme.lightColor};
  }
  .active {
    background: ${p => darken(0.35, p.theme.primaryColor)};
    ${SidebarNavIcon} {
      color: ${p => lighten(0.35, p.theme.secondaryColor)};
    }
  }
`

const Header = styled.div`
  background: ${p => p.theme.backgroundColor};
  color: ${p => p.theme.lightGreyColor};
  text-transform: uppercase;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: calc(100% - 40px);
  padding: 5px 20px;
  h3 {
    max-height: 30px;
    margin: 0;
  }
`

const SidebarLink = styled(NavLink).attrs({
  activeClassName: 'active'
})``

export class IndexPage extends React.Component {
  state = {
    open: false
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  handleKeydown = e => {
    if (e.key === '/') {
      this.setState({ open: true })
    }
  }

  render() {
    const { open } = this.state
    return (
      <PageWrapper>
        <Sidebar>
          <SidebarLink to="/docs">
            <SidebarNavIcon>
              <DataReportIcon />
            </SidebarNavIcon>
          </SidebarLink>
          <SidebarLink to="/visualization">
            <SidebarNavIcon>
              <ChartsIcon />
            </SidebarNavIcon>
          </SidebarLink>
          <SidebarLink to="/players">
            <SidebarNavIcon>
              <PlayersIcon />
            </SidebarNavIcon>
          </SidebarLink>
        </Sidebar>
        <Page>
          <Header>
            <img
              src="/epiclogo_white_250px.png"
              style={{ width: 30, height: 30, marginRight: 10 }}
            />
            <StyledLink to="/" style={{ textDecoration: 'none' }}>
              <h3>data exploration tool</h3>
            </StyledLink>
          </Header>

          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/docs" component={DocsPage} />
            <Route path="/visualization/:vizType?" component={VisualizationPage} />
            <Route path="/players/:playerType?" component={PlayersPage} />
            <Route component={LandingPage} />
          </Switch>
          <Modal open={open} width={900} onClose={() => this.setState({ open: false })}>
            <SearchBar />
          </Modal>
          <Tip>
            Use <kbd>/</kbd> to pull up the sql search bar from any page
          </Tip>
        </Page>
      </PageWrapper>
    )
  }
}
