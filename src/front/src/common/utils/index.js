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
