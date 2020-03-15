import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgSoundSolid(props) {
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
        d="M21.868 23.202c1.797-1.614 2.933-4.737 2.933-7.334 0-2.598-1.136-5.72-2.933-7.334v14.668zm-17.601 0h3.956l8.43 5.62a1.473 1.473 0 001.507.073c.477-.255.774-.752.774-1.293V4.134a1.467 1.467 0 00-2.28-1.22l-8.431 5.62H4.267a2.936 2.936 0 00-2.934 2.934v8.8a2.936 2.936 0 002.934 2.934zm26.4-7.334c0 6-3.626 10.931-8.8 13.2v-2.933c3.502-2.033 5.866-5.936 5.866-10.267 0-4.331-2.364-8.234-5.865-10.267V2.667c5.173 2.27 8.799 7.2 8.799 13.2z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default SvgSoundSolid
