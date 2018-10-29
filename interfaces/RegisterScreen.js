    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     *
     * @format
     * @flow
     */

import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Alert} from 'react-native';

import { Button } from 'react-native-elements'

import Orientation from 'react-native-orientation'
import { red } from 'ansi-colors';

import UserServices from '../database/UserServices'

type Props = {};
export default class RegisterScreen extends Component<Props> {

    constructor(props){
        super(props)
        this.state={
            name: '',
            email:'',
            pass:'',
            dateBirth:'',
            phone:'',
        }
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.panelForm}>
                <TextInput
                    value={this.state.name}
                    placeholder='Nome'
                    onChangeText={(name) => {this.setState({name})}}
                />
                <TextInput
                    value={this.state.email}
                    placeholder='E-mail'
                    onChangeText={(email) => { this.setState({ email }) }}
                />
                <TextInput
                    value={this.state.pass}
                    secureTextEntry
                    placeholder='Senha'
                    onChangeText={(pass) => { this.setState({ pass }) }}
                />
                <TextInput
                    value={this.state.dateBirth}
                    placeholder='Data de nascimento'
                    onChangeText={(dateBirth) => { this.setState({ dateBirth }) }}
                />
                <TextInput
                    value={this.state.phone}
                    placeholder='Celular'
                    onChangeText={(phone) => { this.setState({ phone }) }}
                />
                <Button
                    title='Cadastrar'
                    backgroundColor='#3498DB'
                    onPress={() => this._touchRegister()} />
            </View>
        </View>
    }

    _touchRegister = () => {
        if (this.state.name === '' || this.state.email === '' || this.state.pass === '' || this.state.dateBirth === '' || this.state.phone === ''){
            Alert.alert('Atenção','Todos os campos são obrigatórios')
        }else{
            UserServices.insert(this.state)
            this.props.navigation.goBack()
        }
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
