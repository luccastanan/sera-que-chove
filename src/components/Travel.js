import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-material-ui'

import FullPlace from './FullPlace'
import FirstFullPlace from './FirstFullPlace'
import {mapToList} from '../util'
import baseStyles from '../style/Base'

export default class Travel extends Component {

	constructor(props){
		super(props)
		this.state={
			indexSelected:0
		}
	}

	render(){
		return <Card>
			<View style={this.props.maxWidth ? {width: (this.props.maxWidth * 0.8), flex:1} : baseStyles.container}>
				<FlatList 
				horizontal={false}
					data={mapToList(this.props.travel.places)}
					renderItem={({ item, index }) => index == this.state.indexSelected ? <FirstFullPlace place={item} onSeeMore={() => this.props.onSeeMore(item)} /> : <FullPlace onSelected={() => this._onSelected(index)} place={item} />}
					keyExtractor={(item, index) => index.toString()}
					style={{ flex: 1 }}
					extraData={this.state.indexSelected}
				/>
			</View>
		</Card>
	}

	_onSelected = (index) => {
		this.setState({indexSelected: index})
	}
}