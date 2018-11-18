import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import { PRIMARY_COLOR } from '../Constants'
import Util from '../Utilities';

export default class FullPlace extends Component{

    constructor(props){
        super(props)
        console.log(props.place.weather)
    }

    render(){
        return <View style={styles.container}>
            <View style={styles.infoPanel}>
                <Text style={styles.txAddress}>{this.props.place.address}</Text>
                <Text style={styles.txDate}>{Util.dateFormat(this.props.place.date)}</Text>
            </View>
            <View style={styles.weatherPanel}>
                <Text style={styles.txCurrent}>{this.props.place.weather ? this.props.place.weather.current : '---'}</Text>
                <View style={styles.mmPanel}>
                    <Text style={styles.txMM}>▲ {this.props.place.weather ? this.props.place.weather.max : '---'}</Text>
                    <Text style={styles.txMM}>▼ {this.props.place.weather ? this.props.place.weather.min : '---'}</Text>
                </View>
            </View>
        </View>
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
    txAddress:{
        fontSize:16,
        color:PRIMARY_COLOR
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
    mmPanel:{
        flexDirection:'row'
    }
})