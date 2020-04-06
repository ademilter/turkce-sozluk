import 'react-native-gesture-handler'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'

import {
  FavoriteProvider,
  HistoryProvider,
  HomeProvider,
  ResultsProvider,
  SearchProvider,
} from './context'

import theme from './utils/theme'

import Navigation from './navigation'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <FavoriteProvider>
          <HistoryProvider>
            <HomeProvider>
              <SearchProvider>
                <ResultsProvider>
                  <Navigation />
                </ResultsProvider>
              </SearchProvider>
            </HomeProvider>
          </HistoryProvider>
        </FavoriteProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
