import React from 'react'

import { Box, Button, Text } from './shared'

const CHARACTERS = ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü', 'â', 'î', 'û']

const SpecialCharacters = ({ onCharPress, ...props }) => {
  return (
    <Box
      height={48}
      flex={1}
      width="100%"
      bg="softGray"
      flexDirection="row"
      alignItems="center"
      {...props}
    >
      {CHARACTERS.map((char, index) => (
        <Button
          key={index}
          flex={1}
          onPress={() => onCharPress(char)}
          height="100%"
        >
          <Text color="textMedium" fontWeight="bold">
            {char}
          </Text>
        </Button>
      ))}
    </Box>
  )
}

export default SpecialCharacters
