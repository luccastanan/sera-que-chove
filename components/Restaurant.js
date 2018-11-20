import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native'

import { PRIMARY_COLOR } from '../Constants'
import Services from '../services'

export default class Restaurant extends Component{

    constructor(props){
        super(props)
        this.state={
            data: require('../img/restaurant.jpg')
        }
    }

    render(){
        return <View style={styles.container}>
            <ImageBackground source={this.state.data} 
                resizeMethod='scale'
                style={{height:120}}
                borderRadius={5}>
                <View style={styles.titlePanel}>
                    <Text style={styles.txTitle}>{this.props.rest.title}</Text>
                </View>
            </ImageBackground>
        </View>
    }

    async componentDidMount(){
        if(this.props.rest.image){
            await this._loadPhoto()
        }
    }

    _loadPhoto = () => {
        Services.readPhoto(this.props.rest.image)
            .then(data => {
                const p = {
                    uri: `data:image/jpg;base64,${data}`
                }
                this.setState({ data: p }) 
            })
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