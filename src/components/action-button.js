import React from 'react'

import { Button, Text } from './shared'

const ActionButton = ({ children, ...props }) => {
  return (
    <Button
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.16,
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      }}
      minWidth="actionButton"
      height="actionButton"
      borderRadius="full"
      bg="white"
      px={8}
      {...props}
    >
      {children}
    </Button>
  )
}

const Title = ({ children, ...props }) => {
  return (
    <Text color="textLight" fontWeight="bold" ml={8} mr={8} {...props}>
      {children}
    </Text>
  )
}

ActionButton.Title = Title

export default ActionButton
