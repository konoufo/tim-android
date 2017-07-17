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

import Home from './components/home';


export default class TimCollege extends Component {
  render() {
    return (
      <Home />
    );
  }
}

AppRegistry.registerComponent('TimCollege', () => TimCollege);
