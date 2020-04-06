import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import Bg from './bg'
import { Logo } from './icons'
import Search from './search'
import { Box } from './shared'

const HomeSearch = ({ isSearchFocus, onSearchFocus }) => {
  const searchAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (isSearchFocus) {
      Animated.timing(searchAnim, {
        toValue: 0,
        duration: 230,
      }).start()
    } else {
      Animated.timing(searchAnim, {
        toValue: 1,
        duration: 230,
      }).start()
    }
  }, [searchAnim, isSearchFocus])

  return (
    <Box
      as={Animated.View}
      position="relative"
      zIndex={1}
      style={{
        height: searchAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [84, 230],
        }),
      }}
    >
      <Box
        mt={-60}
        as={Animated.View}
        style={{
          opacity: searchAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        }}
      >
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
        bottom={isSearchFocus ? -48 - 16 : -42}
        p={16}
        width="100%"
      >
        <Search onChangeFocus={status => onSearchFocus(status)} />
      </Box>
    </Box>
  )
}

export default HomeSearch
