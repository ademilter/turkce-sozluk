import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgFavorite(props) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.333 5.333A1.333 1.333 0 008 6.667v18.742l7.225-5.16a1.333 1.333 0 011.55 0L24 25.408V6.667a1.334 1.334 0 00-1.333-1.334H9.333zM6.505 3.838a4 4 0 012.828-1.171h13.334a4 4 0 014 4V28a1.333 1.333 0 01-2.109 1.085L16 22.972l-8.558 6.113A1.333 1.333 0 015.333 28V6.667a4 4 0 011.172-2.829z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default SvgFavorite
