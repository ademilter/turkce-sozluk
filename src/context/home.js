import { createContext } from 'react'

export const homeContextDefault = {
  data: {},
  setData: () => {},
}

const homeContext = createContext(homeContextDefault)

export default homeContext
