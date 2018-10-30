import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';

import FullPlace from './FullPlace'

type Props = {};
export default class Travel extends Component<Props> {

	constructor(props){
		super(props)
	}

	render(){
		return <View style={styles.container}>
			<FlatList 
				data={this.props.travel.places.map(x => Object.assign({}, x))}
				renderItem={ ({item}) => <FullPlace place={item} />}
				keyExtractor={(item, index) => index.toString()}
				style={{ flex: 1 }}
			/>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		margin:8,
		borderWidth:0.5,
		borderColor:'black',
		borderRadius:5,
		padding:8
	}
})