import React from 'react'

import Text from './text'
import Box from './box'
import Button from './button'

export function CardContainer({ children, ...props }) {
  return (
    <Button bg="white" borderRadius="normal" py={16} px={12} {...props}>
      <Box flex={1} borderLeftWidth={3} borderLeftColor="light" pl={12}>
        {children}
      </Box>
    </Button>
  )
}

export function CardTitle({ children }) {
  return (
    <Text fontSize={18} fontWeight="bold">
      {children}
    </Text>
  )
}

export function CardSummary({ children }) {
  return (
    <Text color="textMedium" fontSize={14} mt={8}>
      {children}
    </Text>
  )
}
