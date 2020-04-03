import React, { useEffect, useState, useRef } from 'react'
import { Keyboard } from 'react-native'
import { Animated, View } from 'react-native'
import { Box, Input, Text, Button } from './shared'
import { Search, Close } from './icons'
import SpecialCharacters from './special-characters'

import theme from '../utils/theme'

const SearchBox = ({ onChangeFocus }) => {
  const specialAnim = useRef(new Animated.Value(0)).current
  const [value, setValue] = useState('')
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
    setValue('')
    setFocus(false)
    Keyboard.dismiss()
  }
  const onClear = () => {
    setValue('')
  }

  return (
    <Box flexDirection="column" alignItems="center">
      <Box flexDirection="row" alignItems="center">
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
            value={value}
            onFocus={() => setFocus(true)}
            onChangeText={text => setValue(text)}
          />
          {value.length > 0 && (
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
        flex={1}
        width="100%"
        bg="softGray"
        onCharPress={char => setValue(value + char)}
      />
    </Box>
  )
}
export default SearchBox
