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
export default class Login extends Component<Props> {

    constructor(props){
        super(props)
        this.state={
            email:'',
            pass:''
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
                <Button
                    title='Entrar'
                    backgroundColor='#3498DB'
                    onPress={() => this._touchLogin()} />
                <Button
                    title='Cadastrar-se'
                    onPress={() => this._touchRegister()} />
                <Button
                    title='Esqueci minha senha'
                    onPress={() => this._touchForgot()} />
            </View>
        </View>
    }

    _touchLogin = () => {
        this.props.navigation.navigate('Home')
    }

    _touchRegister = () => {
        this.props.navigation.navigate('Register')
    }

    _touchForgot = () => {

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
