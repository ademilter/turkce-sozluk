import React, { useCallback } from 'react'
import { StatusBar } from 'react-native'
import { Button } from '../components/shared'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'

import { Box, Text } from '../components/shared'

const HistoryView = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, []),
  )

  return (
    <Box as={SafeAreaView} flex={1}>
      <Text>Arama Geçmişi</Text>
      <Button
        onPress={() =>
          navigation.navigate('Detail', { madde: '12123', keyword: 'on para' })
        }
      >
        <Text>on para</Text>
      </Button>
    </Box>
  )
}

export default HistoryView
