import React, { useRef, useState, useEffect, createContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import BottomSheet from 'reanimated-bottom-sheet'
import { FavoritesModal } from '../components/favorites-modal'

export const favoriteContextDefaults = {
  favorites: [],
  isSelectable: false,
  selectedList: [],
  setSelectable: () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  updateSelectedList: () => {},
  removeSelected: () => {},
}

const favoriteContext = createContext(favoriteContextDefaults)

const FavoriteProvider = ({ children }) => {
  const favorites_modal_ref = useRef()
  const [favorites, setFavorites] = useState([])
  const [selectedList, setSelectedList] = useState([])
  const [isSelectable, setSelectable] = useState(false)

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
    isSelectable: isSelectable,
    selectedList: selectedList,
    setSelectable: status => {
      if (status !== undefined) {
        if (status === false) {
          favorites_modal_ref.current.snapTo(1)
          favorites_modal_ref.current.snapTo(1)
          setSelectedList([])
        } else {
          favorites_modal_ref.current.snapTo(0)
          favorites_modal_ref.current.snapTo(0)
        }
        setSelectable(status)
      } else {
        if (!isSelectable === false) {
          setSelectedList([])
          favorites_modal_ref.current.snapTo(1)
          favorites_modal_ref.current.snapTo(1)
        } else {
          favorites_modal_ref.current.snapTo(0)
          favorites_modal_ref.current.snapTo(0)
        }
        setSelectable(!isSelectable)
      }
    },
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
    updateSelectedList: list => {
      setSelectedList(list)
    },
    removeSelected: async () => {
      try {
        const newFavorites = favorites.filter(f => !selectedList.includes(f))
        setFavorites(newFavorites)
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify({ data: newFavorites }),
        )
        setSelectedList(false)
        favorites_modal_ref.current.snapTo(1)
        favorites_modal_ref.current.snapTo(1)
      } catch {
        console.log('error in multiple favorite remove async storage')
      }
    },
  }

  return (
    <favoriteContext.Provider value={favoriteValues}>
      {children}
      <BottomSheet
        ref={favorites_modal_ref}
        enabledGestureInteraction={false}
        snapPoints={[220, 0]}
        initialSnap={1}
        renderContent={() => <FavoritesModal />}
      />
    </favoriteContext.Provider>
  )
}

export { FavoriteProvider }

export default favoriteContext
