/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';

import Orientation from 'react-native-orientation'
import { Button } from 'react-native-elements'
import Swipeout from 'react-native-swipeout' 
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'

import Travel from '../components/Travel'
import TextEmptyList from '../components/TextEmptyList'
import FullRestaurant from '../components/FullRestaurant'

import UserServices from '../database/UserServices'
import TravelServices from '../database/TravelServices'

import baseStyle from '../style/Base'
import {PRIMARY_COLOR} from '../Constants'  

export default class RestaurantListScreen extends Component {

    constructor(props){
        super(props)
        console.log(props)
    }

    render() {
        return (
            <View style={baseStyle.container}>
                <FlatList
                    data={this.props.navigation.getParam('restaurants', null)}
                    renderItem={({ item }) => 
                        <FullRestaurant rest={item} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    style={{ flex: 1 }}
                />
            </View>
        );
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
