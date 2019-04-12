import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { rgba, normalize } from 'polished'

import { IndexPage } from './pages'
import { theme } from 'common/ui/theme'

const DefaultStyles = createGlobalStyle`
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&amp;subset=cyrillic);
   @font-face {
     font-family: Brutal;
     src: url(https://status.kamu.gg/static/js/bundles/fonts/BrutalType.ttf);
   }
   @font-face {
     font-family: Brutal;
     src: url(https://status.kamu.gg/static/js/bundles/fonts/BrutalType-Bold.ttf);
     font-weight: bold;
   }
   @font-face {
     font-family: BrutalBold;
     src: url(https://status.kamu.gg/static/js/bundles/fonts/BrutalType-Bold.ttf);
   }

  ${normalize()}
  html {
     font-family: ${p => p.theme.primaryFont} !important;
  }

    h1, h2, h3 {
    font-family: ${p => p.theme.primaryFont} !important;
    font-weight: bold;
  }

    div {
    min-width: 0;
  }

  a {
    color: ${p => p.theme.primaryColor};
  }

  a:hover {
    color: ${p => p.theme.greyColor};
  }

  p {
    font-family: ${p => p.theme.primaryFont};
  }

  ::selection, inp => p.t::selection {
    color: ${p => p.theme.lightColor};
    background: ${p => rgba(p.theme.primaryColor, 0.7)};
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar:horizontal {
    height: 8px;
  }

  /* Corner */
  ::-webkit-scrollbar-corner {
    background: inherit;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    -webkit-border-radius: 2px;
    border-radius: 2px;
    background-color: transparent;

  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 2px;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    border-radius: 2px;
    background-color: transparent;
  }

  /* disable @reach/dialog styles warning */
  :root {
    --reach-dialog: 1;
  }
`

const CustomThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <DefaultStyles />
      {children}
    </>
  </ThemeProvider>
)

export const App = () => (
  <CustomThemeProvider>
    <Router>
      <IndexPage />
    </Router>
  </CustomThemeProvider>
)
