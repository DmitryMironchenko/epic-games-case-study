import * as React from 'react'
import ReactSelect from 'react-select'
import { withTheme } from 'styled-components'
import { rgba } from 'polished'

const smallScreen = window.innerWidth < 800

const SelectBase = ({ theme, options, value, handleChange, fluid, ...props }) => (
  <ReactSelect
    theme={rstheme => ({
      ...rstheme,
      colors: {
        ...rstheme.colors,
        neutral0: rgba(theme.modalOverlayBackground, 0.75),
        primary25: rgba(theme.primaryColor, 0.25),
        primary50: rgba(theme.primaryColor, 0.5),
        primary75: rgba(theme.primaryColor, 0.75)
      }
    })}
    styles={{
      container: styles => ({
        ...styles,
        display: 'inline-block',
        width: fluid ? '100%' : smallScreen ? '50%' : '30%',
        textTransform: 'capitalize'
      }),
      option: styles => ({
        ...styles,
        color: theme.lightGreyColor
      }),
      input: styles => ({
        ...styles,
        color: theme.lightGreyColor
      }),
      singleValue: styles => ({
        ...styles,
        color: theme.lightGreyColor
      })
    }}
    options={options}
    value={options.filter(option => option === value)}
    getOptionLabel={option => option}
    getOptionValue={option => option}
    onChange={handleChange}
    {...props}
  />
)

export const Select = withTheme(SelectBase)
