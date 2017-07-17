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
		rank: number
	};

	static defaultProps = {
		rank: -1,
	};

	constructor(props: Object){
		super(props);
	}

	render(){
		return <Wizard rank={this.props.rank}>
			<View style={styles.container}>
				<Text style={styles.splashText}> 
					TIM College is an app that will help you make your path to university.  
					Going to university is going to expand your knowledge and give you better chances of landing a great job.
				</Text>
				<Button title="Next" onPress={()=>{console.log('navigate to next step')}} />
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