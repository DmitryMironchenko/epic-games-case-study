import * as React from 'react'
import styled from 'styled-components'

export const Loading = () => (
  <svg
    width="45"
    height="45"
    viewBox="0 0 45 45"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#0090e8"
  >
    <g fill="none" fillRule="evenodd" transform="translate(1 1)" strokeWidth="2">
      <circle cx="22" cy="22" r="6" strokeOpacity="0">
        <animate
          attributeName="r"
          begin="1.5s"
          dur="3s"
          values="6;22"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="1.5s"
          dur="3s"
          values="1;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-width"
          begin="1.5s"
          dur="3s"
          values="2;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="22" cy="22" r="6" strokeOpacity="0">
        <animate
          attributeName="r"
          begin="3s"
          dur="3s"
          values="6;22"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="3s"
          dur="3s"
          values="1;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-width"
          begin="3s"
          dur="3s"
          values="2;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="22" cy="22" r="8">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.5s"
          values="6;1;2;3;4;5;6"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
)

// icon size should be a bit bigger than font-size
const DEFAULT_SIZE_MULTIPLY = 1.3

const getSizeMultiplier = size => (size === 'lg' ? 1.3 : parseInt(size, 10) || 1)
const getSize = ({ size }) => `${getSizeMultiplier(size) * DEFAULT_SIZE_MULTIPLY}em`
const currentColor = p => p.theme[p.color] || p.color || 'currentColor'

const IconWrapper = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 200 200'
})`
  ${p =>
    p.link &&
    `
    &:hover {
      cursor: pointer;
      transform-origin: center;
      transform: scale(1.04);
    }
  `};
  opacity: ${p => p.disabled && '0.5'};
  fill: none;
  width: ${getSize};
  height: ${getSize};
  stroke: ${currentColor};
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-width: ${p => (p.bold ? '15px' : '10px')};
  stroke-miterlimit: 10;
  vertical-align: middle;
  .fill {
    stroke: none;
    fill: ${currentColor};
  }
  .dasharray {
    stroke-dasharray: 10.79 10.79;
  }
`

export const DataReportIcon = props => (
  <IconWrapper {...props}>
    <path d="M143,167.21H57a14.57,14.57,0,0,1-14.53-14.53V47.16A14.57,14.57,0,0,1,57,32.64h55.29l45.3,47.5v72.55A14.57,14.57,0,0,1,143,167.21Z" />
    <polyline points="157.32 80.43 111.95 80.43 111.95 32.63" />
    <line x1="86.07" y1="80.13" x2="72.07" y2="80.13" />
    <line x1="72.07" y1="106.71" x2="127.17" y2="106.71" />
    <line x1="72.07" y1="136.26" x2="127.17" y2="136.26" />
  </IconWrapper>
)

export const ChartsIcon = props => (
  <IconWrapper {...props}>
    <circle cx="49.02" cy="84.15" r="9.08" />
    <circle cx="99.99" cy="51.85" r="9.08" />
    <circle cx="149.94" cy="73.85" r="9.08" />
    <line x1="56.65" y1="79.22" x2="92.09" y2="56.32" />
    <line x1="107.91" y1="56.32" x2="140.85" y2="71.1" />
    <rect x="85.17" y="92.02" width="29.64" height="65.32" rx="5.18" ry="5.18" />
    <rect x="34.19" y="118.43" width="29.64" height="38.91" rx="5.18" ry="5.18" />
    <rect x="135.12" y="109.09" width="29.64" height="48.26" rx="5.18" ry="5.18" />
  </IconWrapper>
)

export const Close = props => (
  <IconWrapper {...props}>
    <line x1="59.3" y1="59.3" x2="140.7" y2="140.7" />
    <line x1="59.3" y1="140.7" x2="140.7" y2="59.3" />
  </IconWrapper>
)

export const PlayersIcon = props => (
  <IconWrapper {...props}>
    <circle cx="99.89" cy="76.95" r="30.61" />
    <path d="M79.06,101c-10.67,5.56-17.73,15.26-17.73,26.3v18.66c0,4.28,4.29,7.76,9.57,7.76h58c5.29,0,9.57-3.47,9.57-7.76V127.25c0-11.18-7.25-21-18.16-26.52" />
    <path d="M79,99.35A26,26,0,1,1,76.84,56.8" />
    <path d="M45.22,99.27c-9.08,4.73-15.09,13-15.09,22.38v15.88c0,3.65,3.65,6.6,8.15,6.6h22.4" />
    <path d="M121,99.35a26,26,0,1,0,2.18-42.55" />
    <path d="M154.78,99.27c9.08,4.73,15.09,13,15.09,22.38v15.88c0,3.65-3.65,6.6-8.15,6.6h-22.4" />
  </IconWrapper>
)
