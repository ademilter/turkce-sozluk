import { createContext } from 'react'

export const favoriteContextDefaults = {
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
}

const favoriteContext = createContext(favoriteContextDefaults)

export default favoriteContext
