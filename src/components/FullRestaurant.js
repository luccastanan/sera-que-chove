import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native'
import StarRating from 'react-native-star-rating';

import {Card} from 'react-native-material-ui'

import { PRIMARY_COLOR } from '../constants'

export default class FullRestaurant extends Component{

    constructor(props) {
        super(props)
        this.state = {
            data: require('../img/restaurant.jpg')
        }
    }

    render(){
        return <Card style={styles.container}>
            <ImageBackground source={this.state.data} 
                resizeMethod='scale'
                style={{height:150}}
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

    async componentDidMount() {
        if (this.props.rest.image) {
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