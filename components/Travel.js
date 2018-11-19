import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-material-ui'

import FullPlace from './FullPlace'
import FirstFullPlace from './FirstFullPlace'
import Util from '../Utilities'
import baseStyles from '../style/Base'

export default class Travel extends Component {

	constructor(props){
		super(props)
		console.log(props.travel.places.length)
	}

	render(){
		return <Card>
			<View style={this.props.maxWidth ? {width: (this.props.maxWidth * 0.8), flex:1} : baseStyles.container}>
				<FlatList 
				horizontal={false}
					data={Util.mapToList(this.props.travel.places)}
					renderItem={({ item, index }) => index == 0 ? <FirstFullPlace place={item} onSeeMore={() => this.props.onSeeMore(item)} /> : <FullPlace place={item} />}
					keyExtractor={(item, index) => index.toString()}
					style={{ flex: 1 }}
				/>
			</View>
		</Card>
	}
}