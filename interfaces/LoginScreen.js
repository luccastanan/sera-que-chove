    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     *
     * @format
     * @flow
     */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert} from 'react-native';
import { Button, Input } from 'react-native-elements'
import Orientation from 'react-native-orientation'

import UserDB from '../database/UserDB'
import {PRIMARY_COLOR} from '../Constants'
import baseStyles from '../style/Base'

export default class LoginScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            email:'l@g.com',
            pass:'123'
        }
    }

    render() {
        return <View style={baseStyles.container}>
            <View style={styles.panelForm}>
                <Input
                    value={this.state.email}
                    leftIcon={{type:'material-icons', name:'email', color:PRIMARY_COLOR}}
                    containerStyle={baseStyles.input}
                    placeholder='Seu e-mail'
                    onChangeText={(email) => this.setState({ email })}
                />
                <Input
                    value={this.state.pass}
                    leftIcon={{ type: 'material-community-icons', name: 'lock', color: PRIMARY_COLOR }}
                    containerStyle={baseStyles.input}
                    placeholder='Seu senha'
                    onChangeText={(pass) => this.setState({pass})}
                />
                <Button
                    title='Entrar'
                    buttonStyle={baseStyles.btnPositive}
                    containerStyle={baseStyles.containerBtn}
                    onPress={() => this._touchLogin()}/>
                <Button
                    title='Cadastrar-se'
                    onPress={() => this._touchRegister()} 
                    titleStyle={baseStyles.btnNegativeText}
                    buttonStyle={baseStyles.btnNegative}
                    containerStyle={baseStyles.containerBtn}/>
            </View>
            <Text style={styles.forgot} onPress={() => this._touchForgot()}>Esqueci minha senha</Text>
        </View>
    }

    _touchLogin = () => {
        let user = UserDB.auth(this.state.email, this.state.pass)
        if (user) {
            UserDB.insertCache(user)
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
    panelForm:{
        flex:1,
        width:300,
        alignSelf:'center',
        justifyContent:'center'
    },
    forgot:{
        margin:12,
        fontSize:16,
        textAlign:'center'
    }
})
