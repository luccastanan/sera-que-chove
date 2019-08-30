import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

import { PRIMARY_COLOR } from '../constants'
import {dateFormat} from '../util';

export default class FullPlace extends Component{

    render(){
        return <TouchableOpacity style={styles.container} onPress={() => this.props.onSelected()}>
            <View style={styles.infoPanel}>
                <Text style={styles.txName}>{this.props.place.name}</Text>
                <Text style={styles.txAddress}>{this.props.place.address}</Text>
                <Text style={styles.txDate}>{dateFormat(this.props.place.date, 1)}</Text>
            </View>
            <View style={styles.weatherPanel}>
                <View style={styles.mmPanel}>
                    <Text style={styles.txMM}>▲ {this.props.place.weather ? this.props.place.weather.max : '---'}</Text>
                    <Text style={styles.txMM}>▼ {this.props.place.weather ? this.props.place.weather.min : '---'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderWidth:1,
        borderColor: PRIMARY_COLOR,
        borderRadius:5,
        padding:8,
        marginStart: 8,
        marginBottom:8,
        marginEnd:8
    },
    infoPanel:{
        flex:1
    },
    weatherPanel:{

    },
    txName: {
        fontSize: 18,
        color: PRIMARY_COLOR
    },
    txAddress: {
        fontSize: 14,
        color: PRIMARY_COLOR
    },
    txDate:{
        fontSize:14,
        color:PRIMARY_COLOR
    },
    txCurrent:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
        color:PRIMARY_COLOR
    },
    txMM:{
        fontSize:14,
        color: PRIMARY_COLOR
    },
    mmPanel:{}
})