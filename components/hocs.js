'use strict'
import React, {Component} from 'react';
import { Dimensions } from 'react-native';
import {View, DeviceEventEmitter} from 'react-native';


export function withKeyboard(ComponentWithKeyboard){
  
  class WrappedComponent extends Component {
    constructor (props) {
      super(props);
      this.state = {
        visibleHeight: Dimensions.get('window').height,
        isOpen: false
      }
    }

    componentWillMount () {
      DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
      DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    componentWillUnMount(){
      DeviceEventEmitter.removeListener('keyboardWillShow', this.keyboardWillShow.bind(this));
      DeviceEventEmitter.removeListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    keyboardWillShow (e) {
      let newSize = Dimensions.get('window').height - e.endCoordinates.height;
      this.setState({visibleHeight: newSize, isOpen: true})
    }

    keyboardWillHide (e) {
      this.setState({visibleHeight: Dimensions.get('window').height, isOpen: false})
    }

    render () {
      return (
        <ComponentWithKeyboard keyboard={{visibleHeight: this.state.visibleHeight, isOpen: this.state.isOpen}} {...this.props}/>
      )
    }
  }

  return WrappedComponent
}