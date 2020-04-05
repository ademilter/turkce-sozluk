import React, { useState, useEffect, createContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const favoriteContextDefaults = {
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
}

const favoriteContext = createContext(favoriteContextDefaults)

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    //favorites
    AsyncStorage.getItem('favorites')
      .then(response => {
        if (response != null) {
          return JSON.parse(response)
        } else {
          return { data: [] }
        }
      })
      .then(result => {
        setFavorites(result.data)
      })
      .catch(err => {
        console.log('error when getting favorites from async storage', err)
      })
  }, [])

  const favoriteValues = {
    favorites: favorites,
    addToFavorites: async k => {
      try {
        const item = { id: Date.now() + '', title: k }
        const newFavorites = [item, ...favorites]
        setFavorites(newFavorites)
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify({ data: newFavorites }),
        )
      } catch {
        console.log('error in favorite async storage add')
      }
    },
    removeFromFavorites: async k => {
      try {
        const newFavorites = favorites.filter(f => f.title !== k)
        setFavorites(newFavorites)
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify({ data: newFavorites }),
        )
      } catch {
        console.log('error in favorite async storage remove')
      }
    },
  }

  return (
    <favoriteContext.Provider value={favoriteValues}>
      {children}
    </favoriteContext.Provider>
  )
}

export { FavoriteProvider }

export default favoriteContext
