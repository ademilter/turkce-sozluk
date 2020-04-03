import 'react-native-gesture-handler'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'

import homeContext from './context/home'
import { getHomeData } from './utils/api'

import theme from './utils/theme'
import Navigation from './navigation'

const App = () => {
  const [homeData, setHomeData] = useState({})

  const homeValues = {
    data: homeData,
    setData: async () => {
      getHomeData().then(pure => {
        console.log('app.js then res', pure)
        const data = {
          kelime: { madde: pure.kelime[0].madde, anlam: pure.kelime[0].anlam },
          atasoz: {
            madde: pure.atasoz[0].madde,
            anlam: pure.atasoz[0].anlam,
          },
        }
        setHomeData(data)
      })
    },
  }

  return (
    <homeContext.Provider value={homeValues}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </homeContext.Provider>
  )
}

export default App
