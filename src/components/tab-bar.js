import React from 'react'

import { Search, Bookmark, RotateCcw } from './icons'
import { Box, Button } from './shared'

import theme from '../utils/theme'

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <Box
      pb={20}
      bg="white"
      flexDirection="row"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return label === 'Search' ? (
          // search button
          <Box key={label} p={15} mt={-15} bg="white" borderRadius="full">
            <Button size={56} bg="red" borderRadius="full" onPress={onPress}>
              <Search stroke="white" />
            </Button>
          </Box>
        ) : (
          // tab-button
          <Button
            key={label}
            pt={6}
            flexDirection="column"
            height={56}
            flex={1}
            onPress={onPress}
          >
            {label === 'History' && (
              <RotateCcw
                color={isFocused ? theme.colors.red : theme.colors.textLight}
              />
            )}
            {label === 'Favorite' && (
              <Bookmark
                color={isFocused ? theme.colors.red : theme.colors.textLight}
              />
            )}

            {/* indicator */}
            <Box
              size={4}
              bg={isFocused ? 'red' : 'white'}
              mt={6}
              borderRadius="full"
            />
          </Button>
        )
      })}
    </Box>
  )
}

export default TabBar
