import React from 'react'
import { FlatList } from 'react-native'

import { Box, Text } from './shared'
import SimpleCard from './simple-card'

const SearchHistoryList = ({ data }) => {
  return (
    <FlatList
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ padding: 16 }}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Box py={6}>
          <SimpleCard>
            <SimpleCard.Title>{item.title}</SimpleCard.Title>
          </SimpleCard>
        </Box>
      )}
      ListHeaderComponent={
        <Text color="textLight" mb={10}>
          Son Aramalar
        </Text>
      }
    />
  )
}

export default SearchHistoryList
