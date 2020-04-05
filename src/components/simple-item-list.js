import React from 'react'
import { FlatList } from 'react-native'

import { Box, Text } from './shared'
import SimpleCard from './simple-card'
import { Right } from './icons'
import theme from '../utils/theme'

const SimpleItemList = ({
  hasHeader = true,
  chevron = false,
  onPress = () => {},
  data,
}) => {
  return (
    <FlatList
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ padding: 16, paddingTop: 24 }}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Box py={6}>
          <SimpleCard onPress={() => onPress(item.title)}>
            <SimpleCard.Title pr={!chevron ? 0 : 32}>
              {item.title}
            </SimpleCard.Title>
            {chevron && (
              <Right
                marginLeft="auto"
                height={18}
                width={18}
                color={theme.colors.red}
              />
            )}
          </SimpleCard>
        </Box>
      )}
      ListFooterComponent={<Box height={20} />}
      ListHeaderComponent={
        hasHeader ? (
          <Text color="textLight" mb={10}>
            Son Aramalar
          </Text>
        ) : (
          () => <></>
        )
      }
    />
  )
}

export default SimpleItemList
