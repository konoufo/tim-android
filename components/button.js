/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {RaisedTextButton, TextButton} from 'react-native-material-buttons';


/* Wrap around `FlatButton` and `RaisedButton` to support the same behaviours (primary, secondary layout etc.) over these
*  without repeating logic. 
**/
class AbstractButton extends Component {
	props: {
		children: React$Element<*>,
		title: string,
		type?: 'primary' | 'secondary',
		onPress: Function,
		containerStyle?: StyleSheet,
		style?: StyleSheet
	};

	static defaultProps = {
		type: 'primary'
	};

	constructor(props: Object){
		super(props);
	}

	render(){
		let buttonStyle = styles[this.props.type];
		return React.cloneElement(this.props.children, {
				style:this.props.containerStyle, 
				color: buttonStyle.backgroundColor,
				titleColor: buttonStyle.color,
				title: this.props.title,
				onPress: this.props.onPress});
	}

};

class RaisedButton extends Component {
	render(){
		let {title, onPress, ...props} = this.props;
		return <AbstractButton {...this.props}>
			<RaisedTextButton title={title} onPress={onPress} />
		</AbstractButton>
	}
}

class FlatButton extends Component {
	render(){
		let {title, onPress, ...props} = this.props;
		return <AbstractButton {...this.props}>
			<TextButton title={title} onPress={onPress} />
		</AbstractButton>
	}
}

const styles = {
	primary: {
		backgroundColor: '#8bc34a',
		color: '#fff'
	},
	secondary: {
		backgroundColor: '#fff',
		color: '#8bc34a',
	},
};

export {RaisedButton, FlatButton};
export default RaisedButton;
