import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Alert} from 'react-native';

import { Button, Input } from 'react-native-elements'

import Orientation from 'react-native-orientation'

import UserDB from '../database/UserDB'
import baseStyles from '../style/Base'
import {PRIMARY_COLOR} from '../Constants'
import InputDate from '../components/InputDate';
import Util from '../Utilities';

export default class AccountScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            name: '',
            email:'',
            pass:'',
            dateBirth:'',
            phone:'',
        }

        this.isCreate = props.navigation.getParam('cmd', 0) == 0
        if (!this.isCreate){
            this.state = UserDB.selectCache(false)
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
                    value={this.state.dateBirth}
                    placeholder='Sua data de nascimento'
                    onSelected={(dateBirth) => this.setState({ dateBirth })}
                    maximumDate={new Date()}
                    mode='date'
                />
                <Input
                    value={this.state.phone}
                    leftIcon={{ type: 'material-icons', name: 'phone-android', color: PRIMARY_COLOR }}
                    containerStyle={baseStyles.input}
                    placeholder='Seu celular'
                    onChangeText={(phone) => this.setState({ phone })}
                />
                <Button
                    title={this.isCreate ? 'Cadastrar' : 'Salvar'}
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
            if (this.isCreate)
                UserDB.insert(this.state)
            else
                UserDB.update(this.state)
                
            this.props.navigation.goBack()
        }
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: (navigation.getParam('cmd', 0) == 0 ? 'Nova cadastro' : 'Perfil')
        }
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
