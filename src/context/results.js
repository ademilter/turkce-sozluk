import React, { useRef, useState, createContext } from 'react'
import BottomSheet from 'reanimated-bottom-sheet'
import { SignContent } from '../components/sign-language'
import { getDetailData, getSoundCode } from '../utils/api'
import parseResults from '../utils/parse-result'

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

const ResultsProvider = ({ children }) => {
  const [sign_sheet_status, set_sign_sheet_status] = useState(false)
  const sign_sheet_ref = useRef()
  const [results, setResults] = useState({})
  const [seskod, setSesKod] = useState('')
  const [signKeyword, setSignKeyword] = useState('')

  const resultsValues = {
    data: results,
    seskod: seskod,
    signsheet: sign_sheet_status,
    clearResults: () => {
      setResults({})
      setSesKod('')
      sign_sheet_ref.current.snapTo(1)
      sign_sheet_ref.current.snapTo(1)
      setSignKeyword('')
      set_sign_sheet_status(false)
    },
    openSignSheet: k => {
      sign_sheet_ref.current.snapTo(0) //open
      sign_sheet_ref.current.snapTo(0) //open
      setSignKeyword(k)
      set_sign_sheet_status(true)
    },
    closeSignSheet: k => {
      sign_sheet_ref.current.snapTo(1) //close
      sign_sheet_ref.current.snapTo(1) //close
      setSignKeyword('')
      set_sign_sheet_status(false)
    },
    getResults: async k => {
      setResults({})
      setSesKod('')
      getDetailData(k)
        .then(res => {
          setResults(parseResults(res[0]))
        })
        .catch(err => {
          console.log('error when fetching results: ', err)
        })
      getSoundCode(k)
        .then(res => {
          setSesKod(res?.[0]?.seskod ?? '')
        })
        .catch(err => {
          console.log('error when fetching sound code: ', err)
        })
    },
  }

  return (
    <resultsContext.Provider value={resultsValues}>
      {children}
      <BottomSheet
        ref={sign_sheet_ref}
        onCloseEnd={() => {
          setSignKeyword('')
          set_sign_sheet_status(false)
        }}
        snapPoints={[302, 0]}
        initialSnap={1}
        renderContent={() => <SignContent keyword={signKeyword} />}
      />
    </resultsContext.Provider>
  )
}

export { ResultsProvider }

export default resultsContext
