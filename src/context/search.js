import { createContext } from 'react'

export const searchContextDefault = {
  keyword: '',
  suggestions: [],
  setKeyword: () => {},
}

const searchContext = createContext(searchContextDefault)

export default searchContext
