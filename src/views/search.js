import React, { useState, useEffect, useCallback, useContext } from 'react'
import { StatusBar } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'

import { Box } from '../components/shared'
import SuggestionCard from '../components/suggestion-card'
import SimpleItemList from '../components/simple-item-list'
import SearchSuggestionList from '../components/search-suggestion-list'
import HomeSearch from '../components/home-search'

import historyContext from '../context/history'
import homeContext from '../context/home'
import searchContext from '../context/search'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item 1',
    summary: 'açıklama 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item 2',
    summary: 'açıklama 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item 3',
    summary: 'açıklama 3',
  },
]

const SearchView = ({ navigation }) => {
  const searchData = useContext(searchContext)
  const homeData = useContext(homeContext)
  const historyData = useContext(historyContext)
  const [isSearchFocus, setSearchFocus] = useState(false)

  useEffect(() => {
    homeData.setData()
    return () => {
      searchData.setKeyword('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(isSearchFocus ? 'dark-content' : 'light-content')
    }, [isSearchFocus]),
  )

  return (
    <Box as={SafeAreaView} bg="softRed" flex={1}>
      {/* Header */}
      <HomeSearch
        isSearchFocus={isSearchFocus}
        onSearchFocus={setSearchFocus}
      />

      {/* content */}
      {/* mx={-16} */}
      <Box flex={1} bg="softRed" pt={isSearchFocus ? 48 : 26}>
        {isSearchFocus ? (
          <Box flex={1}>
            {searchData.keyword.length >= 3 ? (
              <SearchSuggestionList
                onPress={k =>
                  navigation.navigate('Detail', {
                    keyword: k,
                  })
                }
                keyword={searchData.keyword}
                data={searchData.suggestions}
              />
            ) : (
              <SimpleItemList
                onPress={k => navigation.navigate('Detail', { keyword: k })}
                data={historyData.history}
              />
            )}
          </Box>
        ) : (
          <Box px={16} py={40} flex={1}>
            <SuggestionCard
              data={homeData.data?.kelime}
              title="Bir Kelime"
              onPress={() =>
                navigation.navigate('Detail', {
                  keyword: homeData.data?.kelime?.madde,
                })
              }
            />
            <SuggestionCard
              mt={40}
              data={homeData.data?.atasoz}
              title="Bir Deyim - Atasözü"
              onPress={() =>
                navigation.navigate('Detail', {
                  keyword: homeData.data?.atasoz?.madde,
                })
              }
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default SearchView
