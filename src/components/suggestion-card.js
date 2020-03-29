import React from 'react'

import Text from './text'
import Box from './box'
import { CardContainer, CardSummary, CardTitle } from './card'
import LoaderText from './LoaderText'

function SuggestionCard({ title, onPress, data, ...props }) {
  return (
    <Box {...props}>
      <Text color="textLight">{title}</Text>

      <CardContainer mt={10} onPress={onPress}>
        {data ? (
          <>
            <CardTitle>{data.madde}</CardTitle>
            <CardSummary>{data.anlam}</CardSummary>
          </>
        ) : (
          <Box>
            <LoaderText />
            <LoaderText width={200} mt={10} />
          </Box>
        )}
      </CardContainer>
    </Box>
  )
}

export default SuggestionCard
