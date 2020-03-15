import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgFavoriteSolid(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      className=""
      {...props}
    >
      <Path
        d="M25.333 13.51V5.508a2.67 2.67 0 00-2.666-2.666H9.333a2.67 2.67 0 00-2.666 2.666V29.333L16 23.112l9.333 6.221V13.51z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default SvgFavoriteSolid
