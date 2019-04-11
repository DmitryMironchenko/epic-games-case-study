import { css } from 'styled-components';

/**
 * Constructs from a string a hex color, always fixed and unique per given value.
 */
export function getUniqColor(value) {
  const str = `${value}RANDOMSTRING`

  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (let i = 0; i < 3; i++) {
    const colorPart = (hash >> (i * 8)) & 0xff
    color += ('00' + colorPart.toString(16)).substr(-2)
  }

  return color
}

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
};

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {});
