import React, { useContext } from 'react'
import { Box, Text, Button } from './shared'
import { Trash } from './icons'
import { favoriteContext } from '../context'
import theme from '../utils/theme'

const FavoritesModal = () => {
  const favorites = useContext(favoriteContext)

  return (
    <Box
      height="100%"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.16,
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: -2,
        },
      }}
    >
      <Box
        flexDirection="column"
        bg="white"
        flex={1}
        mt={20}
        px={16}
        pt={24}
        pb={48}
      >
        <Box width="100%" flexDirection="row">
          <Button
            disabled={favorites.selectedList.length === 0}
            height={48}
            flex={1}
            mx={8}
            bg={favorites.selectedList.length === 0 ? 'light' : 'red'}
            borderRadius="normal"
            // eslint-disable-next-line react-native/no-inline-styles
            style={
              favorites.selectedList.length !== 0
                ? // eslint-disable-next-line react-native/no-inline-styles
                  {
                    shadowColor: theme.colors.red,
                    shadowOpacity: 0.32,
                    shadowRadius: 12,
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                  }
                : {}
            }
            onPress={() => favorites.removeSelected()}
          >
            <Box pb={2}>
              <Trash
                color={
                  favorites.selectedList.length === 0
                    ? theme.colors.textLight
                    : 'white'
                }
                width={18}
                height={21}
              />
            </Box>
            <Text
              ml={6}
              color={
                favorites.selectedList.length === 0 ? 'textLight' : 'white'
              }
              fontWeight="bold"
            >
              {`Sil (${favorites.selectedList.length})`}
            </Text>
          </Button>
          <Button
            mx={8}
            borderRadius="normal"
            height={48}
            bg="light"
            flex={1}
            onPress={() =>
              favorites.updateSelectedList(
                favorites.selectedList.length === favorites.favorites.length
                  ? []
                  : favorites.favorites,
              )
            }
          >
            <Text fontWeight="bold" color="textMedium">
              {favorites.selectedList.length === favorites.favorites.length
                ? 'Seçimi Temizle'
                : 'Tümünü Seç'}
            </Text>
          </Button>
        </Box>
        <Box width="100%">
          <Button
            mt={16}
            height={48}
            width="100%"
            onPress={() => favorites.setSelectable(false)}
          >
            <Text fontWeight="bold" color="textLight">
              Vazgeç
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export { FavoritesModal }
