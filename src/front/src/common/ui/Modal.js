import * as React from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import styled from 'styled-components'

import { Close } from 'common/ui/Icons'

const ModalOverlay = styled(DialogOverlay)`
  z-index: 2;
  background: ${p => p.theme.modalOverlayBackground};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  display: flex;
  padding: 2vh 10vh;
`

const CloseIcon = styled(Close).attrs({
  size: 'lg',
  bold: true,
  link: true,
  color: 'lightGreyColor'
})`
  position: absolute;
  top: 1vh;
  right: 1vh;
  &:hover {
    stroke: ${p => p.theme.primaryColor};
  }
`

const ModalContent = styled(({ ...props }) => <DialogContent {...props} />)`
  background: transparent;
  border-radius: ${p => p.theme.borderRadius};
  position: relative;
  outline: none;
  margin: auto;
  width: ${p => (typeof p.width === 'number' ? `${p.width}px` : p.width)};
`

const ModalHeader = styled.h1`
  color: ${p => p.theme.primaryColor};
  font-size: 1.5em !important;
  line-height: initial !important;
  margin-bottom: 0 !important;
  text-align: center;
  padding: 1em;
`

export class Modal extends React.Component {
  static defaultProps = {
    width: 900,
    defaultOpen: false,
    padding: '2em'
  }

  state = { open: this.props.defaultOpen }

  isControlled = propName => this.props[propName] !== undefined

  getState = () => ({
    open: this.isControlled('open') ? this.props.open : this.state.open
  })

  componentDidMount() {
    const { onMount } = this.props
    typeof onMount === 'function' && onMount()
  }

  onOpen = () => {
    const { onOpen } = this.props
    this.isControlled('open')
      ? typeof onOpen === 'function' && onOpen()
      : this.setState({ open: true }, onOpen)
  }

  onClose = () => {
    const { onClose } = this.props
    this.isControlled('open')
      ? typeof onClose === 'function' && onClose()
      : this.setState({ open: false }, onClose)
  }

  render() {
    const { open } = this.getState()
    const {
      trigger,
      header,
      className,
      style,
      width,
      children,
      padding,
      initialFocusRef
    } = this.props

    return (
      <>
        {trigger && React.cloneElement(trigger, { onClick: this.onOpen })}
        <ModalOverlay isOpen={open} onDismiss={this.onClose} initialFocusRef={initialFocusRef}>
          <ModalContent className={className} style={style} width={width}>
            {header && <ModalHeader>{header}</ModalHeader>}
            <CloseIcon onClick={this.onClose} aria-label="close" />
            <div style={{ padding }}>{children}</div>
          </ModalContent>
        </ModalOverlay>
      </>
    )
  }
}
