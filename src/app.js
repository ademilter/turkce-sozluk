import 'react-native-gesture-handler'
import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-community/async-storage'
import { ThemeProvider } from 'styled-components'

import throttle from 'lodash/throttle'

import homeContext from './context/home'
import resultsContext from './context/results'
import searchContext from './context/search'
import historyContext from './context/history'
import { getHomeData, getDetailData } from './utils/api'
import { getSuggestions } from './utils/auto-complete'

import theme from './utils/theme'
import Navigation from './navigation'

const App = () => {
  const [homeData, setHomeData] = useState({})
  const [keyword, setKeyword] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [results, setResults] = useState({})
  const [history, setHistory] = useState([])

  const throttledSearch = useCallback(
    throttle(k => getSuggestions(k).slice(0, 12), 500),
    [],
  )

  useEffect(() => {
    AsyncStorage.getItem('history')
      .then(response => {
        if (response != null) {
          return JSON.parse(response)
        } else {
          return { data: [] }
        }
      })
      .then(result => {
        setHistory(result.data)
      })
      .catch(err => {
        console.log('error when getting history from async storage', err)
      })
  }, [])

  const searchValues = {
    keyword: keyword,
    suggestions: suggestions,
    setKeyword: k => {
      setKeyword(k)
      if (k.length >= 3) {
        setSuggestions(throttledSearch(k))
      } else {
        setSuggestions([])
      }
    },
  }

  const historyValues = {
    history: history,
    addToHistory: async k => {
      try {
        const item = { id: Date.now() + '', title: k }
        const newHistory = [
          ...history.filter(el => el.title !== item.title),
          item,
        ].reverse()
        setHistory(newHistory)
        await AsyncStorage.setItem(
          'history',
          JSON.stringify({ data: newHistory }),
        )
      } catch {
        console.log('error in history async storage')
      }
    },
  }

  const homeValues = {
    data: homeData,
    setData: async () => {
      getHomeData()
        .then(pure => {
          const data = {
            kelime: {
              madde: pure.kelime[0].madde,
              anlam: pure.kelime[0].anlam,
            },
            atasoz: {
              madde: pure.atasoz[0].madde,
              anlam: pure.atasoz[0].anlam,
            },
          }
          setHomeData(data)
        })
        .catch(err => {
          console.log('error when fetching home data: ', err)
        })
    },
  }

  const resultsValues = {
    data: results,
    clearResults: () => {
      setResults({})
    },
    getResults: async keyword => {
      getDetailData(keyword)
        .then(res => {
          setResults(res[0])
        })
        .catch(err => {
          console.log('error when fetching results: ', err)
        })
    },
  }

  return (
    <historyContext.Provider value={historyValues}>
      <resultsContext.Provider value={resultsValues}>
        <homeContext.Provider value={homeValues}>
          <searchContext.Provider value={searchValues}>
            <ThemeProvider theme={theme}>
              <SafeAreaProvider>
                <Navigation />
              </SafeAreaProvider>
            </ThemeProvider>
          </searchContext.Provider>
        </homeContext.Provider>
      </resultsContext.Provider>
    </historyContext.Provider>
  )
}

export default App
