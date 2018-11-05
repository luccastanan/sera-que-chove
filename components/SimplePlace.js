import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'

import { PRIMARY_COLOR } from '../Constants'

type Props = {}
export default class SimplePlace extends Component<Props>{

    constructor(props){
        super(props)
    }

    render(){
        return <View style={styles.container}>
                <View style={styles.panelAddress}>
                    <Text style={styles.address}>{this.props.place.address}</Text>
                    {/*<IconMaterial.Button name="close" style={{margin:0, padding:0}} size={24} backgroundColor='transparent' color={PRIMARY_COLOR} onPress={() => this.props.delete(this.props.index)}/>*/}
                </View>
                <View style={styles.panelDate}>
                    <Text style={styles.date}>{this.props.place.date}</Text>
                </View>
            </View>
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        borderWidth:0.5,
        borderColor: PRIMARY_COLOR,
        borderRadius:5,
        margin: 8
    },
    panelAddress:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    address:{
        color:PRIMARY_COLOR,
        margin: 8,
        fontSize:16
    },
    panelDate: {
        alignItems:'center',
        backgroundColor:PRIMARY_COLOR
    },
    date:{
        color:'white',
        marginLeft: 8,
        marginTop:4,
        marginEnd: 8,
        marginBottom: 4
    }
})