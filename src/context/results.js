import { createContext } from 'react'

export const resultsContextDefault = {
  data: {},
  seskod: '',
  clearResults: () => {},
  getResults: () => {},
}

const resultsContext = createContext(resultsContextDefault)

export default resultsContext
