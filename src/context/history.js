import { createContext } from 'react'

export const historyContextDefault = {
  history: [],
  addToHistory: () => {},
}

const historyContext = createContext(historyContextDefault)

export default historyContext
