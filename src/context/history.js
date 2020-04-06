import React, { useState, useEffect, createContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const historyContextDefault = {
  history: [],
  clearHistory: () => {},
  addToHistory: () => {},
}

const historyContext = createContext(historyContextDefault)

const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([])

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
  }, [])

  const historyValues = {
    history: history,
    clearHistory: async k => {
      try {
        setHistory([])
        await AsyncStorage.setItem('history', JSON.stringify({ data: [] }))
      } catch {
        console.log('error in clear history')
      }
    },
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

  return (
    <historyContext.Provider value={historyValues}>
      {children}
    </historyContext.Provider>
  )
}

export { HistoryProvider }

export default historyContext
