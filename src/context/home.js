import React, { useState, createContext } from 'react'
import { getHomeData } from '../utils/api'

export const homeContextDefault = {
  data: {},
  setData: () => {},
}

const homeContext = createContext(homeContextDefault)

const HomeProvider = ({ children }) => {
  const [homeData, setHomeData] = useState({})

  const homeValues = {
    data: homeData,
    setData: async () => {
      getHomeData()
        .then(pure => {
          const data = {
            kelime: {
              madde: pure.kelime[0].madde,
              anlam: pure.kelime[0].anlam,
            },
            atasoz: {
              madde: pure.atasoz[0].madde,
              anlam: pure.atasoz[0].anlam,
            },
          }
          setHomeData(data)
        })
        .catch(err => {
          console.log('error when fetching home data: ', err)
        })
    },
  }

  return (
    <homeContext.Provider value={homeValues}>{children}</homeContext.Provider>
  )
}

export { HomeProvider }

export default homeContext
