import React, { useEffect, useState, useRef, useContext } from 'react'
import { Animated, Keyboard } from 'react-native'
import { Box, Input, Text, Button } from './shared'
import { Search, Close } from './icons'
import SpecialCharacters from './special-characters'

import searchContext from '../context/search'

import theme from '../utils/theme'

const SearchBox = ({ onChangeFocus }) => {
  const searchData = useContext(searchContext)
  const specialAnim = useRef(new Animated.Value(0)).current
  const [isFocus, setFocus] = useState(false)

  useEffect(() => {
    onChangeFocus(isFocus)
    if (isFocus) {
      Animated.timing(specialAnim, {
        toValue: 1,
        duration: 230,
      }).start()
    } else {
      Animated.timing(specialAnim, {
        toValue: 0,
        duration: 230,
      }).start()
    }
  }, [specialAnim, isFocus, onChangeFocus])

  const onCancel = () => {
    searchData.setKeyword('')
    setFocus(false)
    Keyboard.dismiss()
  }
  const onClear = () => {
    searchData.setKeyword('')
  }

  return (
    <Box flexDirection="column" alignItems="center" mx={-16}>
      <Box flexDirection="row" alignItems="center" mx={16}>
        <Box position="relative" flex={1}>
          <Input
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 24,
              shadowOffset: {
                width: 0,
                height: 4,
              },
            }}
            bg="white"
            height={52}
            color="textDark"
            borderWidth={1}
            borderColor={isFocus ? '#D1D1D1' : 'transparent'}
            placeholder="Türkçe Sözlük’te Ara"
            placeholderTextColor="textMedium"
            pl={52}
            borderRadius="normal"
            value={searchData.keyword}
            onFocus={() => setFocus(true)}
            onChangeText={text => searchData.setKeyword(text)}
          />
          {searchData.keyword.length > 0 && (
            <Button onPress={onClear} position="absolute" right={16} top={14}>
              <Close color={theme.colors.textDark} />
            </Button>
          )}
          <Button position="absolute" left={16} top={14}>
            <Search color={theme.colors.textMedium} />
          </Button>
        </Box>
        {isFocus && (
          <Button onPress={onCancel} px={15} height={52}>
            <Text>Vazgeç</Text>
          </Button>
        )}
      </Box>
      <SpecialCharacters
        as={Animated.View}
        style={{
          marginTop: specialAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 16],
          }),
        }}
        height={specialAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 48],
        })}
        onCharPress={char => searchData.setKeyword(searchData.keyword + char)}
      />
    </Box>
  )
}
export default SearchBox
