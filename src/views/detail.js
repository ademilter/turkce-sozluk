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
  Right,
} from '../components/icons'

import DetailFocusBar from '../components/detail-focus-bar'
import ActionButton from '../components/action-button'
import DetailSummaryItem from '../components/detail-summary-item'
import SimpleCard from '../components/simple-card'

import { favoriteContext, resultsContext, historyContext } from '../context'

const tabs = [
  {
    id: 'anlamlar',
    title: 'Açıklama',
  },
  {
    id: 'atasozu',
    title: ' Atasözleri & Deyimler',
  },
  {
    id: 'birlesikler',
    title: 'Birleşik Kelimeler',
  },
]

import theme from '../utils/theme'

function DetailView({ route, navigation }) {
  const keyword = route.params?.keyword
  const [isPlaying, setPlaying] = useState(false)
  const resultsData = useContext(resultsContext)
  const history = useContext(historyContext)
  const favorites = useContext(favoriteContext)
  const isFavorited = favorites.favorites.find(f => f.title === keyword)
  const [selectedTab, setSelectedTab] = useState(tabs[0].id)

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
    setSelectedTab(tabs[0].id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  return (
    <Box as={SafeAreaView} forceInset={{ top: 'never' }} bg="softRed" flex={1}>
      <DetailFocusBar
        onPress={id => setSelectedTab(id)}
        tabs={tabs}
        selected={selectedTab}
      />
      <Box as={ScrollView} p={16} mt={0}>
        {/* Kelime */}
        <Box>
          <Text fontSize={32} fontWeight="bold">
            {keyword}
          </Text>
          <Text color="textLight" mt={6}>
            {resultsData.data?.telaffuz ? resultsData.data?.telaffuz + ' ' : ''}
            {resultsData.data?.lisan ?? ''}
          </Text>
        </Box>
        {/* Action Buttons */}
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
        {/* Icerik */}

        {/* Anlamlar */}
        {selectedTab === tabs[0].id && (
          <Box mt={32} flex={1}>
            {(resultsData.data?.anlamlar ?? [1, 2, 3]).map(item => (
              <DetailSummaryItem
                key={item?.id ?? item}
                data={typeof item === 'number' ? undefined : item}
                border={(item.anlam_sira ?? item) !== '1'}
              />
            ))}
            <Box height={40} />
          </Box>
        )}
        {/* Atasozu */}
        {selectedTab === tabs[1].id && (
          <Box mt={32 - 6} flex={1}>
            {(resultsData.data?.atasozu ?? []).map(item => (
              <Box key={item.id} py={6}>
                <SimpleCard
                  onPress={() => {
                    navigation.navigate('Detail', { keyword: item.title })
                  }}
                >
                  <SimpleCard.Title pr={32}>{item.title}</SimpleCard.Title>
                  <Right
                    marginLeft="auto"
                    height={18}
                    width={18}
                    color={theme.colors.red}
                  />
                </SimpleCard>
              </Box>
            ))}
            <Box height={40} />
          </Box>
        )}
        {/* Birlesikler */}
        {selectedTab === tabs[2].id && (
          <Box mt={32 - 6} flex={1}>
            {(resultsData.data?.birlesikler ?? []).map(item => (
              <Box key={item.id} py={6}>
                <SimpleCard
                  onPress={() => {
                    navigation.navigate('Detail', { keyword: item.title })
                  }}
                >
                  <SimpleCard.Title pr={32}>{item.title}</SimpleCard.Title>
                  <Right
                    marginLeft="auto"
                    height={18}
                    width={18}
                    color={theme.colors.red}
                  />
                </SimpleCard>
              </Box>
            ))}
            <Box height={40} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default DetailView
