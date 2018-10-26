import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';

import Place from './Place'

type Props = {};
export default class Travel extends Component<Props> {

	constructor(props){
		super(props)
		this.state = {
			places: [
				{ address:'R. Belém, 190',
					weather:{
						current:21,
						max:27,
						min:20
					}
				}, {
					address: 'Av. So Paulo, 848',
					weather: {
						current: 19,
						max: 24,
						min: 15
					}
				}, {
					address: 'R. Jacarandá, 866',
					weather: {
						current: 30,
						max: 35,
						min: 29
					}
				}
			]
		}
	}

	render(){
		return <View style={styles.container}>
			<FlatList 
				data={this.state.places}
				renderItem={ place => <Place {...place} />}
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