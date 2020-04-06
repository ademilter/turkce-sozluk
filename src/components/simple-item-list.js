import React from 'react'
import { FlatList } from 'react-native'

import { Box, Text } from './shared'
import SimpleCard from './simple-card'
import { Right, Circle, CircleCheck } from './icons'
import theme from '../utils/theme'

const SimpleItemList = ({
  hasHeader = true,
  chevron = false,
  selectable = false,
  selectedList = [],
  onSelect = () => {},
  onLongPress = () => {},
  onPress = () => {},
  data,
  ...props
}) => {
  return (
    <FlatList
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ padding: 16, paddingTop: 24 }}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Box py={6}>
          <SimpleCard
            py={selectable && selectedList.includes(item) ? 15 : 16}
            onLongPress={onLongPress}
            onPress={() => {
              if (selectable) {
                onSelect(item)
              } else {
                onPress(item.title)
              }
            }}
            style={
              selectedList.includes(item)
                ? // eslint-disable-next-line react-native/no-inline-styles
                  {
                    borderWidth: 1,
                    borderColor: '#F3A5B1',
                    shadowColor: theme.colors.red,
                    shadowOpacity: 0.16,
                    shadowRadius: 4,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                  }
                : {}
            }
          >
            <SimpleCard.Title pr={!chevron ? 0 : 32}>
              {item.title}
            </SimpleCard.Title>
            {selectable ? (
              selectedList.includes(item) ? (
                <CircleCheck
                  marginLeft="auto"
                  height={18}
                  width={18}
                  color={theme.colors.red}
                />
              ) : (
                <Circle
                  marginLeft="auto"
                  height={18}
                  width={18}
                  color={theme.colors.red}
                />
              )
            ) : (
              chevron && (
                <Right
                  marginLeft="auto"
                  height={18}
                  width={18}
                  color={theme.colors.red}
                />
              )
            )}
          </SimpleCard>
        </Box>
      )}
      ListFooterComponent={<Box height={selectable ? 180 : 20} />}
      ListHeaderComponent={
        hasHeader ? (
          <Text color="textLight" mb={10}>
            Son Aramalar
          </Text>
        ) : (
          () => <></>
        )
      }
      {...props}
    />
  )
}

export default SimpleItemList
