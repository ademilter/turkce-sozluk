import React from 'react'
import { FlatList } from 'react-native'

import { Box, Text } from './shared'
import SimpleCard from './simple-card'
import { Right, Book } from './icons'

import theme from '../utils/theme'

const emphasize = (keyword, text) => {
  let key = 0
  const arr = text.split(keyword.toLocaleLowerCase('tr'))
  let arr2 = []
  for (let i = 0; i < arr.length; i++) {
    arr2.push(<Text key={'t' + ++key}>{arr[i]}</Text>)
    if (arr[i + 1] !== undefined) {
      arr2.push(
        <Text key={'t' + ++key} fontWeight="bold">
          {keyword.toLocaleLowerCase('tr')}
        </Text>,
      )
    }
  }
  return arr2
}

const SearchSuggestionList = ({ keyword, data, onPress }) => {
  if (data.length === 0) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Book color={theme.colors.textLight} height={48} width={48} />
        <Text color="textLight" fontWeight={500} mt={24}>
          Aradığınız sözcük bulunamadı.
        </Text>
      </Box>
    )
  } else {
    return (
      <FlatList
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ backgroundColor: 'white' }}
        data={data}
        keyExtractor={item => item.id + ''}
        renderItem={({ item }) => (
          <Box>
            <SimpleCard px={16} py={27} onPress={() => onPress(item.madde)}>
              <SimpleCard.Title pr={32} fontWeight="normal">
                {emphasize(keyword, item.madde)}
              </SimpleCard.Title>
              <Right
                marginLeft="auto"
                height={18}
                width={18}
                color={theme.colors.red}
              />
            </SimpleCard>
          </Box>
        )}
        ItemSeparatorComponent={() => (
          <Box height={1} flex={1} mx={16} bg="softGray" />
        )}
      />
    )
  }
}

export default SearchSuggestionList
