    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     *
     * @format
     * @flow
     */

import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Alert} from 'react-native';

import { Button, Input } from 'react-native-elements'

import Orientation from 'react-native-orientation'

import UserDB from '../database/UserDB'
import baseStyles from '../style/Base'
import {PRIMARY_COLOR} from '../Constants'
import InputDate from '../components/InputDate';

export default class AccountScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            name: 'Luccas',
            email:'l@g.com',
            pass:'123',
            dateBirth:'19/12/97',
            phone:'999991234',
        }
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.panelForm}>
                <Input
                    value={this.state.name}
                    leftIcon={{ type: 'material-icons', name: 'person', color: PRIMARY_COLOR }}
                    containerStyle={baseStyles.input}
                    placeholder='Seu nome'
                    onChangeText={(name) => this.setState({ name })}
                />
                <Input
                    value={this.state.email}
                    leftIcon={{ type: 'material-icons', name: 'email', color: PRIMARY_COLOR }}
                    containerStyle={baseStyles.input}
                    placeholder='Seu e-mail'
                    onChangeText={(email) => this.setState({ email })}
                />
                <Input
                    value={this.state.pass}
                    leftIcon={{ type: 'material-community-icons', name: 'lock', color: PRIMARY_COLOR }}
                    containerStyle={baseStyles.input}
                    placeholder='Sua senha'
                    onChangeText={(pass) => this.setState({ pass })}
                />
                <InputDate
                    placeholder='Sua data de nascimento'
                    onSelected={(dateBirth) => this.setState({ dateBirth })}
                    maximumDate={new Date()}
                />
                <Input
                    value={this.state.phone}
                    leftIcon={{ type: 'material-icons', name: 'phone-android', color: PRIMARY_COLOR }}
                    containerStyle={baseStyles.input}
                    placeholder='Seu celular'
                    onChangeText={(phone) => this.setState({ phone })}
                />
                <Button
                    title='Cadastrar'
                    buttonStyle={baseStyles.btnPositive}
                    containerStyle={baseStyles.containerBtn}
                    onPress={() => this._touchRegister()} 
                />
            </View>
        </View>
    }

    _touchRegister = () => {
        if (this.state.name === '' || this.state.email === '' || this.state.pass === '' || this.state.dateBirth === '' || this.state.phone === '') {
            Alert.alert('Dados faltandos', 'Todos os campos são obrigatórios')
        }else{
            UserDB.insert(this.state)
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
        width:300,
    }
})
