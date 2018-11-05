import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'

type Props = {}
export default class TextEmptyList extends Component<Props> {
    render(){
        return this.props.visible ?
        (<Text style={styles.textEmptyList}>{this.props.text}</Text>):
        null
    }
}

const styles = StyleSheet.create({
    textEmptyList: {
        fontSize: 22,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center'
    }
})