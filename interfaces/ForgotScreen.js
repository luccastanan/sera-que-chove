    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     *
     * @format
     * @flow
     */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { Button, Input } from 'react-native-elements'
import Orientation from 'react-native-orientation'

import baseStyles from '../style/Base'
import {PRIMARY_COLOR} from '../Constants'

export default class ForgotScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            email:''
        }
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.panelForm}>

                <Input
                    leftIcon={{ type: 'material-icons', name: 'email', color: PRIMARY_COLOR }}
                    containerStyle={baseStyles.input}
                    placeholder='Seu e-mail'
                    onChangeText={(email) => this.setState({ email })}
                />

                <Button
                    title='Enviar'
                    buttonStyle={baseStyles.btnPositive}
                    containerStyle={baseStyles.containerBtn}
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
