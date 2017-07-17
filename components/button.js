/* @flow */

import React, { Component } from 'react';
import {
  Button as NativeButton,
  StyleSheet,
} from 'react-native';


export default class Button extends Component {
	props: {
		title: string,
		type: 'primary' | 'secondary',
		onPress: Function,
	};

	static defaultProps = {
		type: 'primary'
	};

	constructor(props: Object){
		super(props);
	}

	render(){
		return <NativeButton style={styles[this.props.type]} title={this.props.title} onPress={this.props.onPress} />
	}

}

const styles = StyleSheet.create({
	primary: {
		backgroundColor: '#8bc34a',
		color: '#fff'
	},
	secondary: {
		backgroundColor: '#fff',
		color: '#8bc34a',
	}
});