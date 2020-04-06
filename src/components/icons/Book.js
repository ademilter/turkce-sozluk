import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgBook(props) {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      className=""
      {...props}
    >
      <Path
        d="M42 6H28c-1.542 0-2.936.602-4 1.56C22.936 6.602 21.542 6 20 6H6a2 2 0 00-2 2v30c0 1.106.894 2 2 2h11.516a4.03 4.03 0 012.828 1.172l2.242 2.242c.018.018.042.024.06.042.172.158.364.298.588.392h.004a1.993 1.993 0 001.524 0h.004c.224-.094.416-.234.588-.392.018-.018.042-.024.06-.042l2.242-2.242A4.03 4.03 0 0130.484 40H42c1.106 0 2-.894 2-2V8a2 2 0 00-2-2zM17.516 36H8V10h12c1.104 0 2 .898 2 2v25.378A8.064 8.064 0 0017.516 36zM40 36h-9.516A8.064 8.064 0 0026 37.378V12c0-1.102.896-2 2-2h12v26z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default SvgBook
