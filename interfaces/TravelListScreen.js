/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import Orientation from 'react-native-orientation'
import { Button } from 'react-native-elements'
import Swipeout from 'react-native-swipeout' 
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'

import Travel from '../components/Travel'
import TextEmptyList from '../components/TextEmptyList'

import UserServices from '../database/UserServices'
import TravelServices from '../database/TravelServices'

import baseStyle from '../style/Base'
import {PRIMARY_COLOR} from '../Constants'

type Props = {};
export default class HomeScreen extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <IconMaterial.Button name="plus" size={30} backgroundColor='transparent' color={PRIMARY_COLOR} onPress={() => navigation.navigate('Travel', {cmd:0})} />
            )
        }
    }

    constructor() {
        super();

        let travels = TravelServices.selectAll(UserServices.selectCache())
        travels = travels == null ? [] : travels.map(x => Object.assign({}, x))

        this.state = {
            travelList: travels,
            openedMenu: false
        };

        console.log(travels)
    }

    render() {
        return (
            <View style={baseStyle.container}>
                <FlatList
                    data={this.state.travelList}
                    renderItem={({ item }) => 
                        <Swipeout right={[{text:'Alterar', type:'primary'}, {text:'Excluir', type:'delete'}]}>
                            <Travel travel={item} />
                        </Swipeout>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    style={{ flex: 1 }}
                />
                <TextEmptyList
                    style={{ flex: 1 }}
                    text='Sem viagens registradas'
                    visible={this.state.travelList.length == 0 ? true : false}
                /> 
            </View>
        );
    }

    _touchAllTravels = () => {
        this.props.navigation.navigate('Login')
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }
}

const styles = StyleSheet.create({
    panel: {
        height: 200,
        backgroundColor: 'gray'
    },
    panelContent: {
        flex: 1
    },
    panelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    panelWeather: {
        flex: 1,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    panelCurrent: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 32
    },
    panelMM: {
        flexDirection: 'row'
    },
    panelBottom: {
        height: 40,
        backgroundColor: '#3498DB',
        flexDirection: 'row'
    },
    panelBottomDesc: {
        flex: 1
    },
    panelBottomWeather: {
        flexDirection: 'row'
    },
    panelBottomMM: {
        flexDirection: 'column'
    }
});
