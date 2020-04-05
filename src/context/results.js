import { createContext } from 'react'

export const resultsContextDefault = {
  data: {},
  seskod: '',
  signsheet: false,
  openSignSheet: () => {},
  closeSignSheet: () => {},
  clearResults: () => {},
  getResults: () => {},
}

const resultsContext = createContext(resultsContextDefault)

export default resultsContext
