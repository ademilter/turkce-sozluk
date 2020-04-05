import 'react-native-gesture-handler'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-community/async-storage'
import { ThemeProvider } from 'styled-components'

import { SignContent } from './components/sign-language'
import BottomSheet from 'reanimated-bottom-sheet'
import debounce from 'lodash/debounce'

import favoriteContext from './context/favorite'
import homeContext from './context/home'
import resultsContext from './context/results'
import searchContext from './context/search'
import historyContext from './context/history'

import { getHomeData, getDetailData, getSoundCode } from './utils/api'
import { getSuggestions } from './utils/auto-complete'

import parseResults from './utils/parse-result'

import theme from './utils/theme'

import Navigation from './navigation'

const App = () => {
  const [sign_sheet_status, set_sign_sheet_status] = useState(false)
  const sign_sheet_ref = useRef()
  const [homeData, setHomeData] = useState({})
  const [keyword, setKeyword] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [results, setResults] = useState({})
  const [seskod, setSesKod] = useState('')
  const [signKeyword, setSignKeyword] = useState('')
  const [history, setHistory] = useState([])
  const [favorites, setFavorites] = useState([])

  const debouncedSearch = useCallback(
    debounce(k => setSuggestions(getSuggestions(k).slice(0, 12)), 500, {
      leading: true,
      maxWait: 600,
    }),
    [],
  )

  useEffect(() => {
    //history
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

    //favorites
    AsyncStorage.getItem('favorites')
      .then(response => {
        if (response != null) {
          return JSON.parse(response)
        } else {
          return { data: [] }
        }
      })
      .then(result => {
        setFavorites(result.data)
      })
      .catch(err => {
        console.log('error when getting favorites from async storage', err)
      })
  }, [])

  const searchValues = {
    keyword: keyword,
    suggestions: suggestions,
    setKeyword: k => {
      setKeyword(k)
      if (k.length >= 3) {
        debouncedSearch(k)
      } else {
        setSuggestions([])
      }
    },
  }

  const favoritesValues = {
    favorites: favorites,
    addToFavorites: async k => {
      try {
        const item = { id: Date.now() + '', title: k }
        const newFavorites = [item, ...favorites]
        setFavorites(newFavorites)
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify({ data: newFavorites }),
        )
      } catch {
        console.log('error in favorite async storage add')
      }
    },
    removeFromFavorites: async k => {
      try {
        const newFavorites = favorites.filter(f => f.title !== k)
        setFavorites(newFavorites)
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify({ data: newFavorites }),
        )
      } catch {
        console.log('error in favorite async storage remove')
      }
    },
  }
  const historyValues = {
    history: history,
    addToHistory: async k => {
      try {
        const item = { id: Date.now() + '', title: k }
        const newHistory = [
          item,
          ...history.filter(el => el.title !== item.title).slice(0, 25),
        ]
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
    seskod: seskod,
    signsheet: sign_sheet_status,
    clearResults: () => {
      setResults({})
      setSesKod('')
      sign_sheet_ref.current.snapTo(1)
      sign_sheet_ref.current.snapTo(1)
      setSignKeyword('')
      set_sign_sheet_status(false)
    },
    openSignSheet: k => {
      sign_sheet_ref.current.snapTo(0) //open
      sign_sheet_ref.current.snapTo(0) //open
      setSignKeyword(k)
      set_sign_sheet_status(true)
    },
    closeSignSheet: k => {
      sign_sheet_ref.current.snapTo(1) //close
      sign_sheet_ref.current.snapTo(1) //close
      setSignKeyword('')
      set_sign_sheet_status(false)
    },
    getResults: async k => {
      setResults({})
      setSesKod('')
      getDetailData(k)
        .then(res => {
          setResults(parseResults(res[0]))
        })
        .catch(err => {
          console.log('error when fetching results: ', err)
        })
      getSoundCode(k)
        .then(res => {
          setSesKod(res?.[0]?.seskod ?? '')
        })
        .catch(err => {
          console.log('error when fetching sound code: ', err)
        })
    },
  }

  return (
    <favoriteContext.Provider value={favoritesValues}>
      <historyContext.Provider value={historyValues}>
        <resultsContext.Provider value={resultsValues}>
          <homeContext.Provider value={homeValues}>
            <searchContext.Provider value={searchValues}>
              <ThemeProvider theme={theme}>
                <SafeAreaProvider>
                  <Navigation />
                  <BottomSheet
                    ref={sign_sheet_ref}
                    onCloseEnd={() => {
                      setSignKeyword('')
                      set_sign_sheet_status(false)
                    }}
                    snapPoints={[302, 0]}
                    initialSnap={1}
                    renderContent={() => <SignContent keyword={signKeyword} />}
                  />
                </SafeAreaProvider>
              </ThemeProvider>
            </searchContext.Provider>
          </homeContext.Provider>
        </resultsContext.Provider>
      </historyContext.Provider>
    </favoriteContext.Provider>
  )
}

export default App
