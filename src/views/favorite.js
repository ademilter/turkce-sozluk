import React, { useCallback, useContext } from 'react'
import { StatusBar } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'
import { Box, Text, Button } from '../components/shared'
import { Left, Favorite } from '../components/icons'
import SimpleItemList from '../components/simple-item-list'

import favoriteContext from '../context/favorite'

import theme from '../utils/theme'

const FavoriteView = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, []),
  )

  const favorites = useContext(favoriteContext)

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
        <Text color="textDark">Favoriler</Text>
      </Box>
      <Box flex={1}>
        {favorites.favorites.length > 0 ? (
          <Box flex={1} pb={20}>
            <SimpleItemList
              hasHeader={false}
              chevron={true}
              onPress={k => navigation.navigate('Detail', { keyword: k })}
              data={favorites.favorites}
            />
          </Box>
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Favorite height={48} width={48} color={theme.colors.textLight} />
            <Text mt={24} fontWeight="bold" color="textMedium">
              Henüz favori yok.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default FavoriteView
