import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native'
import {Rating} from 'react-native-elements'

import { PRIMARY_COLOR } from '../Constants'

export default class FullRestaurant extends Component{

    constructor(props){
        super(props)
        console.log(props.rest)
    }

    render(){
        return <View style={styles.container}>
            <ImageBackground source={require('../img/restaurant.jpg')} 
                resizeMethod='scale'
                style={{height:130}}
                borderRadius={5}>
                <View style={styles.titlePanel}>
                    <Text style={styles.txTitle}>{this.props.rest.title}</Text>
                </View>
            </ImageBackground>
            <View style={styles.infoPanel}>
                <Text>{this.props.rest.address}</Text>
                <Rating 
                    style={{height:15}}
                    imageSize={20}
                    startingValue={this.props.rest.rating}
                    readonly
                />
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container:{
        margin:8,
        borderRadius:5,
        borderWidth:1,
        borderColor:PRIMARY_COLOR
    },
    titlePanel:{
        backgroundColor:'#000000ab',
        position:'absolute',
        bottom:0,
        padding:4,
        width:'100%',
        borderBottomStartRadius:5,
        borderBottomEndRadius:5
    },
    txTitle:{
        color:'white',
        fontSize:18
    },
    infoPanel:{
        marginTop:8
    }
})