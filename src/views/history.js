import React, { useCallback, useContext } from 'react'
import { StatusBar } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'

import { Box, Text, Button } from '../components/shared'
import { Left, RotateCcw, Trash } from '../components/icons'
import SimpleItemList from '../components/simple-item-list'
import historyContext from '../context/history'

import theme from '../utils/theme'

const HistoryView = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, []),
  )

  const history = useContext(historyContext)

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
        {history.history.length > 0 ? (
          <Box flex={1} pt={20} pb={40}>
            <SimpleItemList
              ListFooterComponent={() => (
                <Box py={30} mb={20}>
                  <Button
                    height={48}
                    bg="red"
                    borderRadius="normal"
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      shadowColor: theme.colors.red,
                      shadowOpacity: 0.32,
                      shadowRadius: 12,
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                    }}
                    onPress={() => history.clearHistory()}
                  >
                    <Box pb={2}>
                      <Trash color="white" width={18} height={21} />
                    </Box>
                    <Text ml={6} color="white" fontWeight="bold">
                      Geçmişi Temizle
                    </Text>
                  </Button>
                </Box>
              )}
              hasHeader={false}
              chevron={true}
              onPress={k => navigation.navigate('Detail', { keyword: k })}
              data={history.history}
            />
          </Box>
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center">
            <RotateCcw height={48} width={48} color={theme.colors.textLight} />
            <Text mt={24} fontWeight="bold" color="textMedium">
              Henüz geçmiş yok.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HistoryView
