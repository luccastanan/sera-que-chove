import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'

import { PRIMARY_COLOR } from '../Constants'
import Restaurant from './Restaurant';
import Util from '../Utilities'

export default class FirstFullPlace extends Component{

    render(){
        return <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.infoPanel}>
                    <Text style={styles.txAddress}>{this.props.place.address}</Text>
                    <Text style={styles.txDate}>{this.props.place.date}</Text>
                </View>
                <View style={styles.weatherPanel}>
                    <Text style={styles.txCurrent}>{this.props.place.weather ? this.props.place.weather.current : '---'}</Text>
                    <View style={styles.mmPanel}>
                        <Text style={styles.txMM}>▲ {this.props.place.weather ? this.props.place.weather.max : '---'}</Text>
                        <Text style={styles.txMM}>▼ {this.props.place.weather ? this.props.place.weather.max : '---'}</Text>
                    </View>
                </View>
            </View>
            {this._loadRestaurants()}
        </View>
    }

    _loadRestaurants = () => {
        if(this.props.place.restaurants.length > 0){
            return (<View>
                <View style={styles.div} />
                <FlatList
                    data={Util.mapToList(this.props.place.restaurants)}
                    renderItem={({ item }) => <Restaurant rest={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ flex: 1 }}
                    horizontal
                />
                <Text style={styles.txMore} onPress={() => this.props.onSeeMore()}>ver mais</Text>
            </View>)
        } else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    container:{
        padding:8,
        marginBottom:8
    },
    content:{
        flexDirection:'row'
    },
    infoPanel:{
        flex:1
    },
    weatherPanel:{

    },
    txAddress:{
        fontWeight:'bold',
        fontSize:18,
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
    },
    div: { 
        borderBottomWidth: 1,
        borderBottomColor: PRIMARY_COLOR,
        marginTop:8,
        marginBottom:8
    },
    txMore:{
        fontSize:14,
        color:PRIMARY_COLOR,
        alignSelf:'flex-end'
    }
})