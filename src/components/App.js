// App developed by Johanne Medina for Ogoul Technology


import React, {useEffect} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './Home';
import SignIn from './SignIn';
import Explore from './Explore';
import CommentPage from './CommentPage'


const TabNav = createBottomTabNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          headerShown: false,
          title: 'HOME',
        },
      },

      Explore: {
        screen: Explore,
        navigationOptions: {
          headerShown: false,
          title: 'EXPLORE',
        },
      },
  
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent = Ionicons;
          let iconName;
          if (routeName === 'Home') {
            iconName = `home`;
          } 
          else {
            iconName = `search`;
          }
  
          return <IconComponent name={iconName} size={27} color={tintColor}/>;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#a6a2ab',
        labelStyle: {
          fontSize: 10,
          marginTop: 2,
        },
        style: {
          backgroundColor: '#2d0b59',
          paddingTop: 10,
        },
  
      },
    }
  
  );
  
  
  
  const AppNavigator = createStackNavigator({
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        header: null,
      },
    },
  
    NextPage: {
      screen: TabNav,
      navigationOptions: {
        header: null,
      },
    },

    CommentPage: {
      screen: CommentPage,
      navigationOptions: {
        header: null,
      },
    },
  
  });
 
export default createAppContainer(AppNavigator);