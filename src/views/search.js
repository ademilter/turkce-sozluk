import * as React from 'react'
import { ImageBackground, StatusBar } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'

import { Logo } from '../components/icons'
import Search from '../components/search'
import Box from '../components/box'

import bg from '../assets/bg.jpg'
import Text from '../components/text'

function SearchView() {
  const [isSearchFocus, setSearchFocus] = React.useState(false)

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content')
    }, [])
  )

  return (
    <Box as={SafeAreaView} bg="red" flex={1}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <Box position="relative" zIndex={1} height={isSearchFocus ? 1 : 285}>
        <Box
          as={ImageBackground}
          source={bg}
          style={{ width: '100%', height: '100%' }}
        >
          {/* logo */}
          <Box flex={1} alignItems="center" justifyContent="center">
            <Logo width={120} color="white" />
          </Box>

          {/* search */}
          <Box p={16} width="100%" mb={-42}>
            <Search onChangeFocus={status => setSearchFocus(status)} />
          </Box>
        </Box>
      </Box>

      {/* content */}
      <Box flex={1} bg="white" pt={26}>
        <Box p={30} flex={1}>
          <Text>Hello</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default SearchView
