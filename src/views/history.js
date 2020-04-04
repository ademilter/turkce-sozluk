import React, { useCallback } from 'react'
import { StatusBar } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'

import { Box, Text, Button } from '../components/shared'
import { Left, RotateCcw } from '../components/icons'
import SearchHistoryList from '../components/search-history-list'

import theme from '../utils/theme'

const HistoryView = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, []),
  )

  return (
    <Box as={SafeAreaView} flex={1} bg="softRed">
      <Box
        height={44}
        position="relative"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          position="absolute"
          left={0}
          px={16}
          height="100%"
          onPress={() => navigation.navigate('Search')}
        >
          <Left height={24} color={theme.colors.textDark} />
        </Button>
        <Text color="textDark">Geçmiş</Text>
      </Box>
      <Box flex={1}>
        <SearchHistoryList
          hasHeader={false}
          chevron={true}
          onPress={k => navigation.navigate('Detail', { keyword: k })}
          data={[
            {
              id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
              title: 'on para',
            },
            {
              id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
              title: 'kalem',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d72',
              title: 'emir',
            },
          ]}
        />
      </Box>
    </Box>
  )
}

export default HistoryView
