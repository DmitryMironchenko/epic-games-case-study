import React, { Component } from 'react'
import styled from 'styled-components'

import { Loading } from '../ui/Icons'

const WidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  width: 100%;
  background: transparent;
  position: relative;
  grid-area: ${p => p.gridArea};
`

const WidgetHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0.2rem;
  color: ${p => p.theme.color};
  transition: background 1s linear;
  user-select: none;
  align-self: ${p => p.headerAlign};
  h2 {
    display: inline-block;
    margin-right: 1rem;
    margin: 0;
    margin-bottom: 0 !important;
    margin-right: 1rem;
    font-size: 1.2rem !important;
    font-family: ${p => p.theme.primaryFont};
    color: ${p => p.theme.lightGreyColor};
    font-weight: 500;
    opacity: 0.75;
    letter-spacing: 1.3px;
    text-transform: uppercase;
    svg {
      margin-right: 0.5rem;
      font-size: 1.7em;
    }
  }
`

const WidgetContentWrapper = styled.div`
  padding: ${p => (p.padding === true ? '10px' : p.padding)};
  flex: ${p => p.flex || '1'};
  display: flex;
  flex-direction: ${p => p.flexDirection || 'row'};
  color: ${p => p.theme.color};
  overflow: ${p => p.overflow || 'auto'};
  border-radius: 4px;
  background: ${p => p.theme.widgetBackground};
  box-shadow: ${p => p.theme.widgetBoxShadow};
  margin-bottom: 1em;
  &:last-child {
    margin-bottom: 0;
  }
`

const MessageWrapper = styled.span`
  color: ${p => p.theme[p.color] || p.color};
  font-size: 1.1rem;
  svg {
    margin-right: 0.1rem;
  }
`

const ErrorMessage = ({ message = 'Error' }) => (
  <MessageWrapper color="warningColor">{message}</MessageWrapper>
)

const WidgetActions = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-content: center;
`

const WidgetHeaderContent = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-start;
  align-content: center;
`

const WidgetHeader = ({
  static: staticProp,
  header,
  message,
  actions,
  headerContent,
  headerAlign,
  status = 'SUCCESS',
  className
}) => {
  const widgetHeader = (
    <WidgetHeaderWrapper static={staticProp} className={className} headerAlign={headerAlign}>
      <h2 className="Widget__header">{header}</h2>
      {status === 'ERROR' && <ErrorMessage message={message} />}
      {status === 'SUCCESS' &&
        Boolean(headerContent) && <WidgetHeaderContent>{headerContent}</WidgetHeaderContent>}
      {Boolean(actions) && <WidgetActions>{actions}</WidgetActions>}
    </WidgetHeaderWrapper>
  )

  return widgetHeader
}

const WidgetContent = ({
  flexDirection,
  padding,
  overflow,
  status = 'SUCCESS',
  children,
  ...rest
}) => (
  <WidgetContentWrapper
    flexDirection={flexDirection}
    padding={padding}
    overflow={overflow}
    {...rest}
  >
    {status === 'REQUEST' && (
      <div style={{ margin: 'auto' }}>
        <Loading size="4x" />
      </div>
    )}
    {status === 'SUCCESS' && children}
  </WidgetContentWrapper>
)

class Widget extends Component {
  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    const { hasError } = this.state
    const {
      className,
      style,
      id,
      status,
      message,
      header,
      flexDirection,
      static: staticProp,
      actions,
      headerContent,
      overflow,
      padding,
      headerMode,
      headerAlign,
      children,
      gridArea
    } = this.props

    const widgetStatus = hasError ? 'ERROR' : status

    return (
      <WidgetWrapper id={id} className={className} style={style} gridArea={gridArea}>
        <WidgetHeader
          static={staticProp}
          header={header}
          message={hasError || message}
          actions={actions}
          headerContent={headerContent}
          status={widgetStatus}
          mode={headerMode}
          headerAlign={headerAlign}
        />
        <WidgetContent
          flexDirection={flexDirection}
          padding={padding}
          overflow={overflow}
          status={widgetStatus}
        >
          {children}
        </WidgetContent>
      </WidgetWrapper>
    )
  }
}

Widget.defaultProps = {
  status: 'SUCCESS',
  message: '',
  overflow: 'hidden'
}

Widget.Container = WidgetWrapper
Widget.Header = WidgetHeader
Widget.Content = WidgetContent

export default Widget
