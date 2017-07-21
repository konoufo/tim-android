/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Wizard from './wizard';
import Button from './button';


export default class Home extends Component {
	props: {
		rank: number,
		navigation: Object
	};

	static defaultProps = {
		rank: 0,
	};

	static navigationOptions = {
		title: 'Tim College'
	};

	next = () => {
		this.props.navigation.navigate('Personal', {previousScreen: 'Home'});
	}

	render(){
		return <Wizard rank={this.props.rank} navigation={this.props.navigation}>
			<View style={styles.container}>
				<Text style={styles.splashText}> 
					TIM College is an app that will help you make your path to university.  
					Going to university is going to expand your knowledge and give you better chances of landing a great job.
				</Text>
				<Button title="Next" onPress={this.next} />
			</View>
		</Wizard>
	}

};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		margin: 8,
		marginBottom: 30,
		marginTop: 40
	},
	splashText: {
		fontSize: 21,
		paddingBottom: 24
	}
});