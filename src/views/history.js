import React, { useCallback } from 'react'
import { StatusBar } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'

import { Box, Text } from '../components/shared'

const HistoryView = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, []),
  )

  return (
    <Box as={SafeAreaView} flex={1}>
      <Text>Arama Geçmişi</Text>
    </Box>
  )
}

export default HistoryView
