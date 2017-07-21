/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import Wizard from './wizard';
import Button from './button';
import Theme from './theme';


export default class Personal extends Component {
	props: {
		rank: number,
		navigation: Object,
	};

	static defaultProps = {
		rank: 1,
	};

	static navigationOptions = {
		title: 'Personal Information'
	};

	constructor(props: Object){
		super(props);
	}

	render(){
		return <Wizard rank={this.props.rank} navigation={this.props.navigation} style={{justifyContent: 'flex-start'}} >
			<View style={styles.column}>
			<Text style={styles.label}>What Province do you live in ?</Text>
			<View style={styles.row}>
				<TextInput style={styles.input} placeholder={'Type a location'} autoFocus={true} disableFullscreenUI={true} />
			</View>
			<Text style={styles.label}>What kind of career do you aspire to ?</Text>
			<View style={styles.row}>
				<TextInput style={styles.input} placeholder={'Type your favorite career'} disableFullscreenUI={true} />
			</View>
			</View>
		</Wizard>
	}
};
// base font size
const em = 16;
const styles = StyleSheet.create({
	column: {
		flex: 1,
		justifyContent: 'flex-start',
		paddingTop: 16
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-around',
		margin: 8,
		marginTop: 10
	},
	label: {
		color: Theme.secondary.color,
		fontSize: 1.3 * em,
		marginLeft: 12,
		marginTop: 10,
	},
	input: {
		flex: 1,
		fontSize: em,
		marginTop: -9,
	},
	button: {
		flex: 1
	}
});