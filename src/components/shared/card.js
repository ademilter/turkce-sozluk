import React from 'react'

import { Text, Box, Button } from '.'

const Card = ({ children, ...props }) => {
  return (
    <Button bg="white" borderRadius="normal" py={16} px={12} {...props}>
      <Box flex={1} borderLeftWidth={3} borderLeftColor="light" pl={12}>
        {children}
      </Box>
    </Button>
  )
}

const Title = ({ children }) => {
  return (
    <Text fontSize={18} fontWeight="bold">
      {children}
    </Text>
  )
}

const Summary = ({ children }) => {
  return (
    <Text color="textMedium" fontSize={14} mt={8}>
      {children}
    </Text>
  )
}

Card.Title = Title
Card.Summary = Summary

export default Card
