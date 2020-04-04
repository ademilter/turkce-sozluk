import React, { useState, useCallback, useEffect, useContext } from 'react'
import { StatusBar, ScrollView } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'

import { Box, Text } from '../components/shared'
import { Sound, Hand, Favorite } from '../components/icons'
import ActionButton from '../components/action-button'
import DetailSummaryItem from '../components/detail-summary-item'

import resultsContext from '../context/results'
import historyContext from '../context/history'

import theme from '../utils/theme'

function DetailView({ route }) {
  const keyword = route.params?.keyword
  const resultsData = useContext(resultsContext)
  const history = useContext(historyContext)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, []),
  )

  useEffect(() => {
    if (!history.history.find(el => el.title === keyword)) {
      history.addToHistory(keyword)
    }
    resultsData.getResults(keyword)
    return () => {
      resultsData.clearResults()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box as={SafeAreaView} forceInset={{ top: 'never' }} bg="softRed" flex={1}>
      <Box as={ScrollView} p={16} mt={0}>
        <Box>
          <Text fontSize={32} fontWeight="bold">
            {keyword}
          </Text>
          {resultsData.data?.telaffuz || resultsData.data?.lisan ? (
            <Text color="textLight" mt={6}>
              {resultsData.data?.telaffuz && resultsData.data?.telaffuz}{' '}
              {resultsData.data?.lisan}
            </Text>
          ) : null}
        </Box>
        <Box flexDirection="row" mt={24}>
          <ActionButton disabled={!resultsData.data}>
            <Sound width={24} height={24} color={theme.colors.textLight} />
          </ActionButton>
          <ActionButton disabled={!resultsData.data} ml={12}>
            <Favorite width={24} height={24} color={theme.colors.textLight} />
          </ActionButton>
          <ActionButton disabled={!resultsData.data} ml="auto">
            <Hand width={24} height={24} color={theme.colors.textLight} />
            <ActionButton.Title>Türk İşaret Dili</ActionButton.Title>
          </ActionButton>
        </Box>
        <Box mt={32} flex={1}>
          {(resultsData.data?.anlamlarListe ?? [1, 2, 3]).map(item => (
            <DetailSummaryItem
              key={item?.anlam_sira ?? item}
              data={typeof item === 'number' ? undefined : item}
              border={(item.anlam_sira ?? item) !== '1'}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default DetailView
