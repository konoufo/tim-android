/* @flow */

import React, { Component, PureComponent } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import Color from 'react-native-material-color';
import {Map as SimpleMap, OrderedMap} from 'immutable';

import Wizard from './wizard';
import {FlatButton, RaisedButton as Button} from './button';
import Theme from './theme';


export default class Requirements extends Component {
	state: {
		autocompleteSelected: boolean,
		gradedSubjects: Map<*>,
		selectedSubjects: Map<string, boolean>
	};

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

	constructor(props){
		super(props);
		this.state = {
			autocompleteSelected: false,
			gradedSubjects: new OrderedMap(),
			selectedSubjects: new OrderedMap()
		};

	}

	componentDidMount(){
		// fetched list of subjects
		this._subjectsList = [
			{subjectId: 'mat', name: 'Mathematics'},
			{subjectId: 'geo', name: 'Geography'},
			{subjectId: 'sn', name: 'Natural Sciences'}
		];
		this.setState({
			subjects: this._subjectsList,
			selectedSubjects: OrderedMap(this._subjectsList.map((o,i) =>{
				return [o.subjectId, false]
			})),
		});
	}

	_keyExtractor(item, index){
		return item.subjectId;
	}

	updateSubjectSelection = (subjectId: string) => {
		this.setState((state) => {
			// make a fresh copy then modify
			const selection = new OrderedMap(state.selectedSubject);
			selection.set(subjectId, !selection.get(subjectId));
			return {selectedSubjects: selection}
		});
	};

	sortAutocompleteList = (textInput) => {
		// return a sorted array of subjects which starts with `textInput`
		// if `textInput` is falsy, return all subjects (alphabetically sorted)
		let self = this;
		textInput ?
			this.setState((state) => {
				const subjects = self._subjectsList.filter((o, i) => {
					return o.name.toLowerCase().startsWith(textInput.toLowerCase());
				}).sort((a, b) => {
					return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
				});
				if (subjects){return {subjects: subjects};}
			}) : 
			this.setState((state) => {
				return {subjects: self._subjectsList};
			})
	};

	showAutocomplete = () => {
		this.setState({autocompleteSelected: true});
	};

	hideAutocomplete = () => {
		this.setState({autocompleteSelected: false});
	};

	renderAutocompleteItem = ({item}) => {
		return <SubjectItem
				onPress={this.updateSubjectSelection}
				textStyle={styles.autocompleteItem} 
				name={item.name}
				subjectId={item.subjectId}
				level={item.level} 
				selected={this.state.selectedSubjects.get(item.subjectId)} />
	};

	renderSubjectItem = ({item}) => {
		return <GradedSubjectItem style={styles.item} name={item.name} subjectId={item.subjectId} />
	};

	renderSubjectList(){
		return <FlatList 
					style={styles.list} 
					contentContainerStyle={styles.listContent}
					data={this.state.subjects}
					keyExtractor={this._keyExtractor} 
					renderItem={this.renderSubjectItem} />
	}

	render(){
		const inputContainerStyle = this.state.autocompleteSelected ? [styles.row, styles.autocomplete, styles.autocompleteInputContainer] : styles.row;
		const inputStyle = this.state.autocompleteSelected ? [styles.input, styles.autocompleteInput] : styles.input;
		return <Wizard rank={this.props.rank} navigation={this.props.navigation} style={styles.container}>
			{this.state.autocompleteSelected && <View style={styles.modalContainer} />}
			<View style={{flex: 1, maxHeight: 140}}>
				<View style={styles.column} >
					<Text style={styles.label}>Select your Grade 12 subjects</Text>
					<View style={inputContainerStyle}>
						<TextInput style={inputStyle} 
							placeholder={'Type a subject name'}
							placeholderColor={Color.GREY[200]}
							underlineColorAndroid={this.state.autocompleteSelected ? 'transparent' : 'black'}
							autoFocus={true} 
							disableFullscreenUI={true} 
							onFocus={this.showAutocomplete}
							onBlur={this.hideAutocomplete}
							onChangeText={this.sortAutocompleteList} />
						<Button style={styles.button} title='choose' onPress={()=>{}} />
					</View>
					{this.state.autocompleteSelected && 
						<FlatList style={[styles.autocomplete, styles.autocompleteList]} 
							contentContainerStyle={[styles.listContent, styles.autocompleteListContent]} 
							data={this.state.subjects}
							keyExtractor={this._keyExtractor} 
							renderItem={this.renderAutocompleteItem}
							ListEmptyComponent={<Text style={styles.listPlaceholderText}>
									Woops... No matching subjects.
								</Text>} />
					}
				</View>
			</View>
			
		</Wizard>
	}
};

class SubjectItem extends PureComponent {
	props: {
		style?: StyleObj,
		subjectStyle?: StyleObj,
		levelStyle?: StyleObj,
		textStyle?: StyleObj,
		level?: string,
		name: string,
		subjectId: string,
		onPress?: Function,
	};

	_onPress = () => {
		this.props.onPress && this.props.onPress(this.props.subjectId);
	};

	render(){
		return <TouchableNativeFeedback 
			background={TouchableNativeFeedback.SelectableBackground()}
			onPress={this._onPress}>
			<View style={this.props.style}>
				<View style={styles.itemContent}>
					<Text style={[styles.subjectText, this.props.textStyle, this.props.subjectStyle]}>{this.props.name}</Text>
					<Text style={[styles.subjectLevel, this.props.textStyle, this.props.levelStyle]}>{this.props.level}</Text>
				</View>
			</View>
		</TouchableNativeFeedback>
	}
}

class GradedSubjectItem extends PureComponent {
	props: {
		style?: StyleObj,
	};

	render(){
		return <View style={styles.itemContent} >
			<SubjectItem {...this.props} />
			<Text style={[styles.subjectText, styles.gradeText]}>4</Text>
			<FlatButton type='secondary' title='Edit' onPress={() => {}} />
		</View>
	}
}


// base font size
const em = 16;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start'
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		margin: 8,
		marginTop: 10
	},
	column: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	label: {
		color: Theme.secondary.color,
		fontSize: 1.3 * em,
		marginLeft: 12,
		marginTop: 10,
	},
	list: {
		backgroundColor: 'white',
		flex: 3,
		padding: 18,
		paddingTop: 0
	},
	listContent: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginTop: 0,
		padding: 24
	},
	item: {
		backgroundColor: 'transparent',
	},
	itemContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	subjectLevel: {
		color: Color.GREY[400]
	},
	subjectText: {
		fontSize: 1.4 * em,
	},
	gradeText: {
		color: 'blue',
	},
	input: {
		color: Color.GREY[700],
		flex: 2,
		fontSize: em,
		marginTop: -9,
	},
	autocomplete: {
		left: 0,
		position: 'absolute',
		right: 0,
		zIndex: 3
	},
	autocompleteInputContainer: {
		top: 40
	},
	autocompleteInput: {
		backgroundColor: 'white',
		borderRadius: 2,
		paddingBottom: 7.5, // makes the input the same height as the button
		paddingLeft: 8
	},
	autocompleteList: {
		backgroundColor: 'white',
		marginLeft: 8,
		maxWidth: 290,
		top: 90
	},
	autocompleteListContent: {
		paddingBottom: 8,
		paddingTop: 8
	},
	autocompleteItem: {
		fontSize: em,
		paddingBottom: 8
	},
	listPlaceholderText: {
		color: Color.GREY[400],
		fontSize: 1.01 * em,
	},
	modalContainer: {
		backgroundColor: 'rgba(0,0,0,.6)',
		bottom: 0,
		left: 0,
		paddingTop: 12,
		position: 'absolute',
		right: 0,
		top: 0,
		zIndex: 2,
	},
	button: {
		flex: 1
	}
});