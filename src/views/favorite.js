import React, { useState, useEffect, useCallback, useContext } from 'react'
import { StatusBar } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'
import { Box, Text, Button } from '../components/shared'
import { Left, Favorite } from '../components/icons'
import SimpleItemList from '../components/simple-item-list'

import favoriteContext from '../context/favorite'

import theme from '../utils/theme'

const FavoriteView = ({ navigation }) => {
  const favorites = useContext(favoriteContext)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
      return () => {
        favorites.setSelectable(false)
        favorites.updateSelectedList([])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  const onLongPress = () => {
    favorites.setSelectable()
  }

  const onSelect = item => {
    if (favorites.selectedList.includes(item)) {
      favorites.updateSelectedList(
        favorites.selectedList.filter(el => el !== item),
      )
    } else {
      favorites.updateSelectedList([...favorites.selectedList, item])
    }
  }

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
              onPress={k => navigation.navigate('Detail', { keyword: k })}
              onLongPress={onLongPress}
              onSelect={onSelect}
              selectedList={favorites.selectedList}
              selectable={favorites.isSelectable}
              hasHeader={false}
              chevron={true}
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
