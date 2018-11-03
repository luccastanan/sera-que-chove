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
import { red } from 'ansi-colors';
import { Button } from 'react-native-elements'
import Travel from '../components/Travel'

import RNPopover from 'react-native-popover-menu';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import ActionButton from 'react-native-action-button';

import UserServices from '../database/UserServices'
import TravelServices from '../database/TravelServices'

import Swipeout from 'react-native-swipeout' 

type Props = {};
export default class HomeScreen extends Component<Props> {

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
            <View style={styles.container}>
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
                <Button 
                    title='Nova Viagem'
                    onPress={() => this.props.navigation.navigate('Travel')}
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
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
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
