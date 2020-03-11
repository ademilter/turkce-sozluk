import { Button } from 'react-native'
import * as React from 'react'

import { Logo } from '../components/icons'
import Search from '../components/search'
import Box from '../components/box'

function SearchView({ navigation }) {
  return (
    <Box>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Detail')}
      />

      <Box py={20}>
        <Logo width={120} color="blue" />
      </Box>

      <Box p={10}>
        <Search />
      </Box>
    </Box>
  )
}

export default SearchView
