    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     *
     * @format
     * @flow
     */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput} from 'react-native';

import { Button } from 'react-native-elements'

import Orientation from 'react-native-orientation'
import { red } from 'ansi-colors';

type Props = {};
export default class Forgot extends Component<Props> {

    constructor(props){
        super(props)
        this.state={
            email:''
        }
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.panelForm}>
                <TextInput
                    placeholder='E-mail'
                    onChangeText={(text) => {this.setState({email:text})}}
                />
                <Button
                    title='Enviar'
                    backgroundColor='#3498DB'
                    onPress={() => this._touchSend()} />
            </View>
        </View>
    }

    _touchSend = () => {
        
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems:'center',
        justifyContent:'center'
    },
    panelForm:{
        width:200,
    }
})
