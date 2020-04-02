import React from 'react'

import { Text, Button } from './shared'

const SimpleCard = ({ children, ...props }) => {
  return (
    <Button
      justifyContent="flex-start"
      bg="white"
      borderRadius="normal"
      p={16}
      {...props}
    >
      {children}
    </Button>
  )
}

const Title = ({ children }) => {
  return (
    <Text fontSize={16} fontWeight="bold">
      {children}
    </Text>
  )
}

SimpleCard.Title = Title

export default SimpleCard
