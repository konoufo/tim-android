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


export default class Requirements extends Component {
	props: {
		rank: number,
		navigation: Object,
	};

	static defaultProps = {
		rank: 2,
	};

	static navigationOptions = {
		title: 'Admission Requirements'
	};

	render(){
		return <Wizard rank={this.props.rank} navigation={this.props.navigation} >
			<Text style={styles.label}>Select your Grade 12 subjects</Text>
			<View style={styles.row}>
				<TextInput style={styles.input} placeholder={'Type a subject name'} autoFocus={true} disableFullscreenUI={true} />
				<Button style={styles.button} title='choose' onPress={()=>{}} />
			</View>
		</Wizard>
	}
};
// base font size
const em = 16;
const styles = StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
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
		flex: 2,
		fontSize: em,
		marginTop: -9,
	},
	button: {
		flex: 1
	}
});