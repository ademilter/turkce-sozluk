import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgLeft(props) {
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
        d="M19 7l-9 9 9 9 2.23-2.23L14.46 16l6.77-6.77L19 7z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default SvgLeft
