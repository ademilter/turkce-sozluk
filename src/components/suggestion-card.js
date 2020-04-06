import React from 'react'
import { Text, Box, Card, Placeholder } from './shared'

const SuggestionCard = ({ title, onPress, data, ...props }) => {
  return (
    <Box {...props}>
      <Text color="textLight">{title}</Text>

      <Card mt={10} disabled={data ? false : true} onPress={onPress}>
        <>
          <Placeholder autoRun visible={data ? true : false}>
            <Card.Title>{data?.madde}</Card.Title>
          </Placeholder>
          <Placeholder
            autoRun
            visible={data ? true : false}
            mt={16}
            width={240}
          >
            <Card.Summary>{data?.anlam}</Card.Summary>
          </Placeholder>
        </>
      </Card>
    </Box>
  )
}

export default SuggestionCard
