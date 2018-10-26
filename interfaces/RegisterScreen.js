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
export default class Register extends Component<Props> {

    constructor(props){
        super(props)
        this.state={
            email:'',
            pass:'',
            dateBirth:'',
            cellphone:'',
        }
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.panelForm}>
                <TextInput
                    placeholder='E-mail'
                    onChangeText={(text) => {this.setState({email:text})}}
                />
                <TextInput
                    secureTextEntry
                    placeholder='Senha'
                    onChangeText={(text) => { this.setState({ pass: text }) }}
                />
                <TextInput
                    placeholder='Data de nascimento'
                    onChangeText={(text) => { this.setState({ dateBirth: text }) }}
                />
                <TextInput
                    placeholder='Celular'
                    onChangeText={(text) => { this.setState({ cellphone: text }) }}
                />
                <Button
                    title='Cadastrar'
                    backgroundColor='#3498DB'
                    onPress={this._touchRegister()} />
            </View>
        </View>
    }

    _touchRegister = () => {

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
