import React from 'react'

import { Box } from './shared'

const LoaderText = ({ ...props }) => {
  return <Box bg="light" width={120} height={16} {...props} />
}

export default LoaderText
