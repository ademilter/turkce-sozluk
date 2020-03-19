import 'react-native-gesture-handler'
import * as React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'

import theme from './utils/theme'
import Navigation from './navigation'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
