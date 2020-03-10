import React from 'react'
import { View } from 'react-native'

import Button from './button'
import { Search, Bookmark, RotateCcw } from './icons'
import Box from './box'

import theme from '../utils/theme'

function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
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
            target: route.key
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return label === 'Search' ? (
          <Box key={label} p={15} mt={-15} bg="white" borderRadius="full">
            <Button size={56} bg="red" borderRadius="full" onPress={onPress}>
              <Search stroke="white" />
            </Button>
          </Box>
        ) : (
          <Button
            key={label}
            pt={6}
            flexDirection="column"
            height={56}
            flex={1}
            onPress={onPress}
          >
            {label === 'History' && <RotateCcw stroke={theme.colors.gray} />}
            {label === 'Favorite' && <Bookmark stroke={theme.colors.gray} />}
            <Box size={3} bg={isFocused ? 'red' : 'white'} mt={6} />
          </Button>
        )
      })}
    </View>
  )
}

export default TabBar
