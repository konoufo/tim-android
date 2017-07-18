/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {FlatButton as Button} from './button';
import Theme from './theme';


export default class Wizard extends Component {
	state: {
		loaded: boolean,
		completed: boolean
	};

	props : {
		steps: Array<Object>,
		rank: number,
		navigation: Object,
		children: React$Element<*>
	};

	static defaultProps = {
		steps: [
			{},
			{id: 'Personal', label: 'Personal information'},
			{id: 'Requirements', label: 'Admission requirements'},
			{id: 'Result', label: 'Find programs'},
		],
		rank: 0
	};

	constructor(props: Object){
		super(props);
		this.state = {
			loaded: false,
			completed: false,
		};
		// bind navigation functions only once before mounting
		this.navigationFuncs = this.props.steps.map(function(o, i){
			if (!o['id']){ return null};
			return () => this.navigate(this.props.steps[i]['id']);
		}.bind(this));
	}

	componentDidMount(){
		// fetch inital data from DB storage
		//...
		
	}

	navigate(screenName: string, props?: Object){
		this.props.navigation.navigate(screenName, props);
	}



	renderNavPills(){
		let nextIndex = this.props.rank + 1;
		let nextSteps = this.props.steps.slice(nextIndex);
		return (
			<View style={styles.navPills}>
				{nextSteps && React.Children.toArray(nextSteps.map((o, i)=>{
					return <Button title={o.label} containerStyle={styles.button}
							onPress={this.navigationFuncs[nextIndex + i]} />
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
		backgroundColor: 'white',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	navPills: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'flex-end'
	},
	body: {
		flex: 2,
		padding: 12,
		paddingTop: 16,
	},
	button: {
		backgroundColor: Theme.primary.backgroundColor,
		flex: 1,
		justifyContent: 'center',
		marginBottom: 1,
		maxHeight: 80
	},
});