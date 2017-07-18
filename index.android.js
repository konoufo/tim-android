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
  StackNavigator
} from 'react-navigation';

import Home from './components/home';
import Personal from './components/personal';
import Requirements from './components/requirements';


const App = StackNavigator({
  Home: {screen: Home},
  Personal: {screen: Personal},
  Requirements: {screen: Requirements},
});

AppRegistry.registerComponent('TimCollege', () => App);
