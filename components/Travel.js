import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native'
import {Card} from 'react-native-elements'

import FullPlace from './FullPlace'
import FirstFullPlace from './FirstFullPlace'
import { PRIMARY_COLOR } from '../Constants';
import Util from '../Utilities'

export default class Travel extends Component {

	constructor(props){
		super(props)
	}

	render(){
		return <View style={styles.container}>
			<FlatList 
				data={Util.mapToList(this.props.travel.places)}
				renderItem={({ item, index }) => index == 0 ? <FirstFullPlace place={item} onSeeMore={() => this.props.onSeeMore(item)} /> : <FullPlace place={item} />}
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
		borderColor:PRIMARY_COLOR,
		borderRadius:5,
		padding:8,
		backgroundColor:'#ecf0f1'
	}
})