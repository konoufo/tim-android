/**
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  NavigationActions,
  StackNavigator
} from 'react-navigation';

import Routes from './components/routes';
import Home from './components/home';
import Personal from './components/personal';
import Requirements from './components/requirements';


const App = StackNavigator({
  Home: {screen: Home},
  Personal: {screen: Personal},
  Requirements: {screen: Requirements},
}, {
    navigationOptions: {
        headerTitleStyle: {
            textAlign: 'center'
        }
    }
});

const defaultGetStateForAction = App.router.getStateForAction;

App.router.getStateForAction = (action, state) => {
    if (
      state &&
      action.type === NavigationActions.BACK
    ) {
        const oldScreen = state.routes[state.index].routeName;
        const nextScreen = Routes[oldScreen].previousScreen;
        if (nextScreen) {
            // Override the usual `goBack` behaviour.
            // This make us go back in the logical order of screens instead of following navigation history.
            let routes = [
              {'routeName': nextScreen, key: 1}
            ];
            // set another route object in `routes` to show `goBack` UI element
            const newGoBackScreen = Routes[nextScreen].previousScreen;
            if (newGoBackScreen){
                routes.unshift({routeName: newGoBackScreen, key: 0});
            }
            return {
                ...state,
                routes,
                index: routes.length - 1
            }  
        }
    }
    return defaultGetStateForAction(action, state);

};


AppRegistry.registerComponent('TimCollege', () => App);
