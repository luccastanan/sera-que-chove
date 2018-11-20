import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Switch} from 'react-native'
import {} from 'react-native-elements'

import baseStyles from '../style/Base'
import { PRIMARY_COLOR } from '../Constants';
import UserDB from '../database/UserDB';

import PushNotification from 'react-native-push-notification'
import Util from '../Utilities';

export default class SettingsScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            isVibrate: true,
            name:'',
            email:''
        }
    }

    render(){
        return <View style={styles.container}>
            <Text style={styles.titleCategory}>Notificações</Text>
            <View style={styles.optionContainer}>
                <Text style={styles.titleOption}>Horários</Text>
            </View>
            <View style={baseStyles.dividerHorizontal}/>
            <View style={styles.optionContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.titleOption}>Vibrar</Text>
                    <Switch
                        value={this.state.isVibrate}
                        onValueChange={value => this._changeVibrate(value)}
                    />
                </View>
            </View>
            <Text style={styles.titleCategory}>Conta</Text>
            <TouchableOpacity style={styles.optionContainer}
                onPress={() => this.props.navigation.navigate('Account', {cmd: 1})}>
                <Text style={styles.titleOption}>{this.state.name}</Text>
                <Text style={styles.descOption}>{this.state.email}</Text>
            </TouchableOpacity>
            <View style={baseStyles.dividerHorizontal} />
            <TouchableOpacity style={styles.optionContainer}>
                <Text style={styles.titleOption}>Sair</Text>
            </TouchableOpacity>
        </View>
    }

    _changeVibrate = (value) => {
        this.setState({ isVibrate: value })
        Util.setStorage('vibrate', (value ? 1 : 0).toString())
    }

    async componentDidMount(){
        let users = UserDB.selectCache(true)
        users.addListener((users, changes) => {
            changes.modifications.forEach(index => {
                let u = users[index]
                this.setState({name:u.name, email:u.email})
            })
        })

        let vibrate = !!(await Util.getStorage('vibrate', 1))
        this.setState({ name: users[0].name, email: users[0].email, isVibrate: vibrate })
    }
}

const styles = StyleSheet.create({
    container:{
        
    },
    titleCategory:{
        fontSize:14,
        fontWeight:'bold',
        color:PRIMARY_COLOR,
        marginStart:16,
        marginEnd:18,
        marginBottom:8,
        marginTop:8
    },
    optionContainer:{
        paddingStart: 16,
        paddingEnd: 18,
        minHeight:50,
        justifyContent:'center'
    },
    titleOption:{
        fontSize:18,
        color:PRIMARY_COLOR
    },
    descOption: {
        fontSize: 14,
        color: PRIMARY_COLOR
    }
})


