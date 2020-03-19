import React from 'react'
import { Animated } from 'react-native'

import Box from './box'
import Bg from './bg'
import { Logo } from './icons'
import Search from './search'

const HERO_HEIGHT = 230

function HomeSearch({ isSearchFocus, onSearchFocus }) {
  const [bgOpacity] = React.useState(new Animated.Value(1))
  const [heroHeight] = React.useState(new Animated.Value(HERO_HEIGHT))

  React.useEffect(() => {
    if (isSearchFocus) {
      // bg-opacity
      Animated.timing(bgOpacity, {
        toValue: 0,
        duration: 230
      }).start()
      // hero-height
      Animated.timing(heroHeight, {
        toValue: 52 + 32,
        duration: 230
      }).start()
    } else {
      // bg-opacity
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 230
      }).start()
      // hero-height
      Animated.timing(heroHeight, {
        toValue: HERO_HEIGHT,
        duration: 230
      }).start()
    }
  }, [bgOpacity, heroHeight, isSearchFocus])

  return (
    <Box as={Animated.View} position="relative" zIndex={1} height={heroHeight}>
      <Box mt={-60} as={Animated.View} style={{ opacity: bgOpacity }}>
        <Bg pt={60} pb={26}>
          <Box flex={1} alignItems="center" justifyContent="center">
            <Logo width={120} color="white" />
          </Box>
        </Bg>
      </Box>

      {/* search */}
      <Box
        position="absolute"
        left={0}
        bottom={isSearchFocus ? 0 : -42}
        p={16}
        width="100%"
      >
        <Search onChangeFocus={status => onSearchFocus(status)} />
      </Box>
    </Box>
  )
}

export default HomeSearch
