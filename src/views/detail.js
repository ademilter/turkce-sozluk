import React, { useState, useCallback, useEffect, useContext } from 'react'
import { StatusBar, ScrollView } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'
import Sound from 'react-native-sound'

import throttle from 'lodash/throttle'

import { Box, Text } from '../components/shared'
import {
  SoundSolid as SoundIconSolid,
  Sound as SoundIcon,
  Hand,
  Favorite,
  FavoriteSolid,
} from '../components/icons'

import ActionButton from '../components/action-button'
import DetailSummaryItem from '../components/detail-summary-item'

import { favoriteContext, resultsContext, historyContext } from '../context'

import theme from '../utils/theme'

function DetailView({ route }) {
  const keyword = route.params?.keyword
  const [isPlaying, setPlaying] = useState(false)
  const resultsData = useContext(resultsContext)
  const history = useContext(historyContext)
  const favorites = useContext(favoriteContext)
  const isFavorited = favorites.favorites.find(f => f.title === keyword)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
      return function() {
        resultsData.clearResults()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  useFocusEffect(
    useCallback(() => {
      resultsData.getResults(keyword)
      return () => {
        resultsData.clearResults()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]),
  )

  useEffect(() => {
    history.addToHistory(keyword)
    //resultsData.getResults(keyword)
    //resultsData.getResults(keyword)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  return (
    <Box as={SafeAreaView} forceInset={{ top: 'never' }} bg="softRed" flex={1}>
      <Box as={ScrollView} p={16} mt={0}>
        <Box>
          <Text fontSize={32} fontWeight="bold">
            {keyword}
          </Text>
          <Text color="textLight" mt={6}>
            {resultsData.data?.telaffuz ? resultsData.data?.telaffuz + ' ' : ''}
            {resultsData.data?.lisan ?? ''}
          </Text>
        </Box>
        <Box flexDirection="row" mt={24}>
          <ActionButton
            disabled={resultsData.seskod.length === 0}
            onPress={throttle(() => {
              const track = new Sound(
                `https://sozluk.gov.tr/ses/${resultsData.seskod}.wav`,
                null,
                e => {
                  if (e) {
                    console.log('error loading track', e)
                  } else {
                    setPlaying(true)
                    track.play(s => {
                      setPlaying(false)
                    })
                  }
                },
              )
            }, 500)}
          >
            {isPlaying ? (
              <SoundIconSolid width={24} height={24} color={theme.colors.red} />
            ) : (
              <SoundIcon
                width={24}
                height={24}
                color={
                  resultsData.seskod.length > 0
                    ? theme.colors.textLight
                    : theme.colors.softGray
                }
              />
            )}
          </ActionButton>
          <ActionButton
            ml={12}
            onPress={throttle(() => {
              if (isFavorited) {
                favorites.removeFromFavorites(keyword)
              } else {
                favorites.addToFavorites(keyword)
              }
            }, 500)}
          >
            {isFavorited ? (
              <FavoriteSolid width={24} height={24} color={theme.colors.red} />
            ) : (
              <Favorite width={24} height={24} color={theme.colors.textLight} />
            )}
          </ActionButton>
          <ActionButton
            disabled={keyword ? false : true}
            ml="auto"
            onPress={throttle(() => {
              resultsData.signsheet
                ? resultsData.closeSignSheet()
                : resultsData.openSignSheet(keyword)
            }, 500)}
          >
            <Hand
              width={24}
              height={24}
              color={
                resultsData.signsheet
                  ? theme.colors.red
                  : theme.colors.textLight
              }
            />
            <ActionButton.Title
              color={resultsData.signsheet ? 'red' : 'textLight'}
            >
              Türk İşaret Dili
            </ActionButton.Title>
          </ActionButton>
        </Box>
        <Box mt={32} flex={1}>
          {(resultsData.data?.anlamlar ?? [1, 2, 3]).map(item => (
            <DetailSummaryItem
              key={item?.id ?? item}
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
