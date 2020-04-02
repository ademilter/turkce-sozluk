import React from 'react'

import { Text, Box, Card } from './shared'
import LoaderText from './LoaderText'

const SuggestionCard = ({ title, onPress, data, ...props }) => {
  return (
    <Box {...props}>
      <Text color="textLight">{title}</Text>

      <Card mt={10} onPress={onPress}>
        {data ? (
          <>
            <Card.Title>{data.madde}</Card.Title>
            <Card.Summary>{data.anlam}</Card.Summary>
          </>
        ) : (
          <Box>
            <LoaderText />
            <LoaderText width={200} mt={10} />
          </Box>
        )}
      </Card>
    </Box>
  )
}

export default SuggestionCard
