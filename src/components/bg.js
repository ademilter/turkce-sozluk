import * as React from 'react'
import { ImageBackground } from 'react-native'

import Box from './box'

import bg from '../assets/bg.jpg'

function Bg({ children, ...props }) {
  return (
    <Box
      as={ImageBackground}
      source={bg}
      style={{ width: '100%', height: '100%' }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Bg
