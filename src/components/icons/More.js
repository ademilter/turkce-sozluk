import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgMore(props) {
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
        d="M16 13c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm9 0c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zM7 13c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default SvgMore
