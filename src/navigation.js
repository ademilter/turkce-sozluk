import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import TabBar from './components/tab-bar'
import { Left, More } from './components/icons'

import SearchView from './views/search'
import HistoryView from './views/history'
import FavoriteView from './views/favorite'
import DetailView from './views/detail'

import theme from './utils/theme'
import Button from './components/button'

const Tab = createBottomTabNavigator()
const HomeStack = createStackNavigator()

function SearchStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Search"
        component={SearchView}
        options={() => {
          return {
            headerShown: false
          }
        }}
      />
      <HomeStack.Screen
        name="Detail"
        component={DetailView}
        options={({ route, navigation }) => {
          return {
            title: route.params?.title,
            headerStyle: {
              backgroundColor: theme.colors.softRed,
              shadowColor: 'transparent'
            },
            headerLeft: () => (
              <Button
                px={20}
                height="100%"
                onPress={() => navigation.navigate('Search')}
              >
                <Left color={theme.colors.textDark} />
              </Button>
            ),
            headerRight: () => (
              <Button
                px={20}
                height="100%"
                onPress={() => navigation.navigate('Search')}
              >
                <More color={theme.colors.textDark} />
              </Button>
            )
          }
        }}
      />
    </HomeStack.Navigator>
  )
}

function TabNavigator() {
  return (
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
  )
}

export default TabNavigator
