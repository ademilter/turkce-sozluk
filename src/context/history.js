import { createContext } from 'react'

export const historyContextDefault = {
  history: [],
  addToHistory: () => {},
  getHistory: () => {},
}

const historyContext = createContext(historyContextDefault)

export default historyContext
