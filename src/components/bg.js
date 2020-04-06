import * as React from 'react'
import { ImageBackground } from 'react-native'
import { Box } from './shared'

import bg from '../assets/bg.jpg'

const Bg = ({ children, ...props }) => {
  return (
    <Box
      as={ImageBackground}
      source={bg}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ width: '100%', height: '100%' }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Bg
