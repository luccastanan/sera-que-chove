import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-material-ui'

import FullPlace from './FullPlace'
import FirstFullPlace from './FirstFullPlace'
import Util from '../Utilities'

export default class Travel extends Component {

	constructor(props){
		super(props)
	}

	render(){
		return <Card style={styles.container}>
			<View style={styles.padd}>
				<FlatList 
					data={Util.mapToList(this.props.travel.places)}
					renderItem={({ item, index }) => index == 0 ? <FirstFullPlace place={item} onSeeMore={() => this.props.onSeeMore(item)} /> : <FullPlace place={item} />}
					keyExtractor={(item, index) => index.toString()}
					style={{ flex: 1 }}
				/>
			</View>
		</Card>
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		margin:8
	},
	padd:{
		
	}
})