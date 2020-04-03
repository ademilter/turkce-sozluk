import { createContext } from 'react'

export const resultsContextDefault = {
  data: {},
  clearResults: () => {},
  getResults: () => {},
}

const resultsContext = createContext(resultsContextDefault)

export default resultsContext
