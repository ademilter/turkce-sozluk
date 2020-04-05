import React, { useState, useCallback, createContext } from 'react'
import debounce from 'lodash/debounce'
import { getSuggestions } from '../utils/auto-complete'

export const searchContextDefault = {
  keyword: '',
  suggestions: [],
  setKeyword: () => {},
}

const searchContext = createContext(searchContextDefault)

const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const debouncedSearch = useCallback(
    debounce(k => setSuggestions(getSuggestions(k).slice(0, 12)), 500, {
      leading: true,
      maxWait: 600,
    }),
    [],
  )

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

  return (
    <searchContext.Provider value={searchValues}>
      {children}
    </searchContext.Provider>
  )
}

export { SearchProvider }

export default searchContext
