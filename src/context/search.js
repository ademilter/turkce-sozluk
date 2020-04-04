import { createContext } from 'react'

export const searchContextDefault = {
  keyword: '',
  setKeyword: () => {},
  getSuggestions: () => {},
}

const searchContext = createContext(searchContextDefault)

export default searchContext
