import 'react-native-gesture-handler'
import * as React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import TabBar from './components/tab-bar'

import SearchView from './views/search'
import HistoryView from './views/history'
import FavoriteView from './views/favorite'
import DetailView from './views/detail'

import theme from './utils/theme'

const Tab = createBottomTabNavigator()
const HomeStack = createStackNavigator()

function SearchStack() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Search" component={SearchView} />
      <HomeStack.Screen name="Detail" component={DetailView} />
    </HomeStack.Navigator>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Search"
            tabBar={props => <TabBar {...props} />}
          >
            <Tab.Screen name="History" component={HistoryView} />
            <Tab.Screen name="Search" component={SearchStack} />
            <Tab.Screen name="Favorite" component={FavoriteView} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
