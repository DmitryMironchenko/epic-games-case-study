import styled, { css } from 'styled-components'

export { default as Widget } from './Widget'
export { PageWrapper } from './PageWrapper'
export { Modal } from './Modal'
export { Button } from './Button'
export { Scrollbars } from './Scrollbars'
export { Select } from './Select'
export { Table, Column } from './Table'

export const PageHeader = styled.h2`
  text-transform: uppercase;
  font-family: ${p => p.theme.primaryFont};
  text-align: center;
  width: 100%;
  color: ${p => p.theme.lightGreyColor};
  background: transparent;
`

export const media = {
  desktop: (...args) => css`
    @media (max-width: 1700px) {
      ${css(...args)};
    }
  `,
  laptop: (...args) => css`
    @media (max-width: 1440px) {
      ${css(...args)};
    }
  `,
  tablet: (...args) => css`
    @media (max-width: 800px) {
      ${css(...args)};
    }
  `,
  phone: (...args) => css`
    @media (max-width: 420px) {
      ${css(...args)};
    }
  `
}
