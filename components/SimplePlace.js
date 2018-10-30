import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {}
export default class SimplePlace extends Component<Props>{

    constructor(props){
        super(props)
    }

    render(){
        return <View style={styles.container}>
                <View style={styles.panelAddress}>
                    <Text>{this.props.place.address}</Text>
                    <Icon name="times" size={25} color="black" />
                </View>
                <View style={styles.horizontalLine}/>
                <View style={styles.panelDate}>
                    <Text>{this.props.place.date}</Text>
                </View>
            </View>
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        borderWidth:0.5,
        borderColor: 'black',
        borderRadius:5,
        padding:8,
        marginBottom:8
    },
    panelAddress:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    panelDate: {
        alignItems:'center'
    },
    horizontalLine:{
        borderBottomColor: 'black',
        borderBottomWidth:0.5
    }
})