/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from './button';


export default class Wizard extends Component {
	state: {
		loaded: boolean,
		completed: boolean
	};

	props : {
		steps: Array<Object>,
		rank: number,
		children: React$Element<*>
	};

	static defaultProps = {
		steps: [
			{id: 'personal', label: 'Personal information'},
			{id: 'requirements', label: 'Admission requirements'},
			{id: 'result', label: 'Find programs'},
		],
		rank: 0
	};

	constructor(props: Object){
		super(props);
		this.state = {
			loaded: false,
			completed: false,
		};
	}

	componentWillMount(){
		// fetch inital data from DB storage
	}

	renderNavPills(){
		return (
			<View style={styles.navPills}>
				{this.props.steps && React.Children.toArray(this.props.steps.slice(this.props.rank).map((o)=>{
					return <Button title={o.label} onPress={()=>{console.log('navigate to ' + o.label)}} />
				}))}
			</View>
		)
	}

	render(){
		return <View style={styles.container}>
			<View style={styles.body}>
				{this.props.children}
			</View>
			{this.renderNavPills()}
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	navPills: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'center'
	},
	body: {
		flex: 2,
		padding: 12,
		paddingTop: 16,
	}
});