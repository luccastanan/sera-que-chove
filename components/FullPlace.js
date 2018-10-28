import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

type Props = {}
export default class FullPlace extends Component<Props>{

    render(){
        return <View style={styles.container}>
                <View style={styles.infoPanel}>
                    <Text>{this.props.item.address}</Text>
                    <Text>{this.props.item.date}</Text>
                </View>
                <View style={styles.weatherPanel}>
                    <Text style={styles.weatherCurrent}>{this.props.item.weather.current}</Text>
                    <View style={styles.mmPanel}>
                        <Text>▲ {this.props.item.weather.max}</Text>
                        <Text>▼ {this.props.item.weather.min}</Text>
                    </View>
                </View>
            </View>
    }
}

const styles = StyleSheet.create({
    container:{
        width:200,
        flexDirection:'row',
        borderWidth:0.5,
        borderColor: 'black',
        borderRadius:5,
        padding:8,
        marginBottom:8
    },
    infoPanel:{
        flex:1
    },
    weatherPanel:{

    },
    weatherCurrent:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20
    },
    mmPanel:{
        flexDirection:'row'
    }
})