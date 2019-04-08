import * as React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { get } from 'lodash'
import { lighten, rgba } from 'polished'

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  overflow: hidden;
`

const Loading = () => <LoadingWrapper>"Loading"</LoadingWrapper>

const buttonColor = p => get(p.theme, p.color) || p.color || p.theme.primaryColor

const getSizeMultiplier = size => (size === 'lg' ? 1.3 : parseInt(size, 10) || 1)
const size = ({ size }) => `${getSizeMultiplier(size)}em`

const ButtonWrapper = styled.button`
  transition: all 0.2s;
  min-height: 1.7em;
  min-width: 1em;
  font-family: ${p => p.theme.primaryFont};
  border-radius: ${p => p.theme.buttonBorderRadius};
  color: ${p => p.theme.activeColor};
  border: 1px solid ${p => rgba(p.theme.greyColor, 0.5)};
  background: ${p => p.theme.buttonBackground};
  margin: 0 0.2rem;
  position: relative;
  line-height: 1.7em;
  font-size: ${size};
  padding: 0.1em 1em;
  margin: 0 0.2rem;
  user-select: none;

  &.Button_bold {
    font-weight: 700;
  }

  &.Button_rounded {
    border-radius: 100px;
  }

  &.Button_primary {
    border-color: ${p => rgba(buttonColor(p), 0.5)};
  }

  cursor: ${p => (p.loading || p.disabled ? 'default' : 'pointer')};

  &.Button_fluid {
    width: 100%;
    margin: 0;
  }

  &:disabled {
    opacity: 0.3;
  }

  &:not([disabled]):hover {
    background: ${p => rgba(buttonColor(p), 0.25)};
  }

  &.Button_active:not([disabled]):hover,
  &.Button_active-on-hover:not([disabled]):hover {
    background: ${p => rgba(buttonColor(p), 0.75)};
  }

  &.Button_active,
  &:not([disabled]):active,
  &.Button_active-on-hover:not([disabled]):hover,
  &.Button_active-on-hover:not([disabled]):focus {
    color: ${p => p.theme.lightColor};
    background: ${p => lighten(0.05, buttonColor(p))};
    border-color: ${p => rgba(buttonColor(p), 0.5)};
  }

  &.Button_active:not([disabled]):active,
  &.Button_active-on-hover:not([disabled]):active {
    background: ${buttonColor};
  }

  &:focus {
    outline: 0;
    background: ${p => rgba(buttonColor(p), 0.1)};
  }

  &.Button_active:focus,
  &.Button_active-on-hover:focus {
    background: ${buttonColor};
  }

  &.Button_loose {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  &.Button_icon-only {
    padding-left: 0.2em;
    padding-right: 0.2em;
  }

  &.Button_wide {
    padding-left: 2em;
    padding-right: 2em;
  }

  &:last-child {
    margin-right: 0;
  }
`

const Content = styled.span`
  transition: visibility 0.01s ease-in;
  visibility: ${p => p.loading && 'hidden'};
`

export const Button = ({
  title,
  loading,
  login,
  className,
  active,
  activeOnHover = login,
  rounded = login,
  primary = login,
  wide = login,
  loose = login,
  fluid,
  bold = login,
  as: asComponent,
  children,
  ...rest
}) => {
  const Wrapper = asComponent ? ButtonWrapper.withComponent(asComponent) : ButtonWrapper
  const iconOnly = !children && children !== 0

  const classNames = [
    className,
    active && 'Button_active',
    loading && activeOnHover && 'Button_active',
    activeOnHover && 'Button_active-on-hover',
    rounded && 'Button_rounded',
    primary && 'Button_primary',
    wide && 'Button_wide',
    loose && 'Button_loose',
    fluid && 'Button_fluid',
    iconOnly && 'Button_icon-only',
    bold && 'Button_bold'
  ]
  const wrapperClassName = classNames.filter(item => item).join(' ')

  return (
    <Wrapper className={wrapperClassName} loading={loading} title={title} {...rest}>
      <Content loading={loading}>{children}</Content>
      {loading && <Loading />}
    </Wrapper>
  )
}

Button.propTypes = {
  /** Adds rounded borders to button. */
  rounded: PropTypes.bool,
  /** Shows button as active. */
  active: PropTypes.bool,
  /** Shows button as disabled. */
  disabled: PropTypes.bool,
  /** SvgIcon name. */
  icon: PropTypes.string,
  /** Button color. */
  color: PropTypes.string,
  /** Makes button primary (adds colored borders). */
  primary: PropTypes.bool,
  /** Makes button fill full width of it's container. */
  fluid: PropTypes.bool,
  /** Adds bigger padding from the sides. */
  wide: PropTypes.bool,
  /** Adds bigger padding from top and bottom. */
  loose: PropTypes.bool,
  /** Makes button content bold. */
  bold: PropTypes.bool,
  /** Shows button as active on hover. */
  activeOnHover: PropTypes.bool,
  /** Button for login pages. */
  login: PropTypes.bool,
  /** Shows button as loading. */
  loading: PropTypes.bool,
  /** Size multiplyier. */
  size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x'])
}

const ButtonGroup = styled.div`
  margin: 0 0.2rem;
  float: ${p => p.float};
  white-space: nowrap;
  display: inline-flex;
  button {
    margin: 0;
    border-radius: 0;
  }
  & > button:first-child,
  & > *:first-child > button {
    border-top-left-radius: ${p => p.theme.buttonBorderRadius};
    border-bottom-left-radius: ${p => p.theme.buttonBorderRadius};
  }
  & > button:last-child,
  & > *:last-child > button {
    border-top-right-radius: ${p => p.theme.buttonBorderRadius};
    border-bottom-right-radius: ${p => p.theme.buttonBorderRadius};
  }
`

ButtonGroup.propTypes = {
  /** ButtonGroup position. */
  float: PropTypes.oneOf(['right', 'left', 'center'])
}

Button.Group = ButtonGroup
