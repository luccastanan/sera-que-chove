import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native'

import { PRIMARY_COLOR } from '../Constants'

export default class Restaurant extends Component{

    render(){
        return <View style={styles.container}>
            <ImageBackground source={require('../img/restaurant.jpg')} 
                resizeMethod='scale'
                style={{height:120}}
                borderRadius={5}>
                <View style={styles.titlePanel}>
                    <Text style={styles.txTitle}>{this.props.rest.title}</Text>
                </View>
            </ImageBackground>
        </View>
    }
}

const styles = StyleSheet.create({
    container:{
        width:120,
        height:120,
        margin:4,
        borderRadius:5,
        borderWidth:0.1,
        borderColor:'transparent'
    },
    titlePanel:{
        backgroundColor:'#000000ab',
        position:'absolute',
        bottom:0,
        padding:2,
        width:'100%',
        borderBottomStartRadius:5,
        borderBottomEndRadius:5
    },
    txTitle:{
        color:'white',
        fontSize:14
    }
})