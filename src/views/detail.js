import React from 'react'
import { StatusBar, ScrollView } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'

import { Box, Text } from '../components/shared'
import { Sound, Hand, Favorite } from '../components/icons'
import ActionButton from '../components/action-button'
import DetailSummaryItem from '../components/detail-summary-item'

import theme from '../utils/theme'

function DetailView({ route }) {
  const keyword = route.params?.keyword
  // const keyword = 'milliyet'

  const [data, setData] = React.useState(null)

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content')
    }, []),
  )

  const getDetailData = async k => {
    const response = await fetch(`https://sozluk.gov.tr/gts?ara=${k}`)
    const d = await response.json()
    setData(d[0])
  }

  React.useEffect(() => {
    getDetailData(keyword)
  }, [keyword])

  return (
    <Box as={SafeAreaView} bg="softRed" flex={1}>
      <Box as={ScrollView} p={16}>
        <Box>
          <Text fontSize={32} fontWeight="bold">
            {keyword}
          </Text>
          {data?.telaffuz || data?.lisan ? (
            <Text color="textLight" mt={6}>
              {data?.telaffuz && data?.telaffuz} {data?.lisan}
            </Text>
          ) : null}
        </Box>
        <Box flexDirection="row" mt={24}>
          <ActionButton disabled={!data}>
            <Sound width={24} height={24} color={theme.colors.textLight} />
          </ActionButton>
          <ActionButton disabled={!data} ml={12}>
            <Favorite width={24} height={24} color={theme.colors.textLight} />
          </ActionButton>
          <ActionButton disabled={!data} ml="auto">
            <Hand width={24} height={24} color={theme.colors.textLight} />
            <ActionButton.Title>Türk İşaret Dili</ActionButton.Title>
          </ActionButton>
        </Box>
        <Box mt={32}>
          {(data?.anlamlarListe ?? [1, 2, 3]).map(item => (
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
