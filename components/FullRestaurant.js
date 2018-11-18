import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native'
import StarRating from 'react-native-star-rating';

import {Card} from 'react-native-material-ui'

import { PRIMARY_COLOR } from '../Constants'

export default class FullRestaurant extends Component{

    constructor(props){
        super(props)
        console.log(props.rest)
    }

    render(){
        return <Card style={styles.container}>
            <ImageBackground source={require('../img/restaurant.jpg')} 
                resizeMethod='scale'
                style={{height:130}}
                borderTopLeftRadius={5}
                borderTopRightRadius={5}>
                <View style={styles.titlePanel}>
                    <Text style={styles.txTitle}>{this.props.rest.title}</Text>
                    <StarRating
                        disabled
                        maxStars={5}
                        rating={this.props.rest.rating}
                        fullStarColor={PRIMARY_COLOR}
                        starSize={25}
                    />
                </View>
            </ImageBackground>
            <View style={styles.infoPanel}>
                <Text style={styles.txAddress}>{this.props.rest.address}</Text>
            </View>
        </Card>
    }
}

const styles = StyleSheet.create({
    container:{
        margin:8,
    },
    titlePanel:{
        backgroundColor:'#000000ab',
        position:'absolute',
        bottom:0,
        paddingStart:8,
        paddingTop:4,
        paddingEnd:8,
        paddingBottom:4,
        width:'100%',
        flexDirection:'row',
    },
    txTitle:{
        color:'white',
        fontSize:18,
        flex:1
    },
    infoPanel:{
        paddingStart: 8,
        paddingTop: 4,
        paddingEnd: 8,
        paddingBottom: 4
    },
    txAddress:{
    }
})