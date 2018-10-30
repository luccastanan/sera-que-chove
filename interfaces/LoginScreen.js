    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     *
     * @format
     * @flow
     */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert} from 'react-native';

import { Button } from 'react-native-elements'

import Orientation from 'react-native-orientation'
import { red } from 'ansi-colors';

import UserServices from '../database/UserServices'

type Props = {};
export default class LoginScreen extends Component<Props> {

    constructor(props){
        super(props)
        this.state={
            email:'l@g.com',
            pass:'123'
        }
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.panelForm}>
                <TextInput
                    value={this.state.email}
                    placeholder='E-mail'
                    onChangeText={(text) => {this.setState({email:text})}}
                />
                <TextInput
                    value={this.state.pass}
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
        let user = UserServices.auth(this.state.email, this.state.pass)
        if (user) {
            UserServices.insertCache(user)
            this.props.navigation.navigate('Home')
        }else {
            Alert.alert('Atenção', 'Dados inválidos')
        }
    }

    _touchRegister = () => {
        this.props.navigation.navigate('Register')
    }

    _touchForgot = () => {
        this.props.navigation.navigate('Forgot')
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
