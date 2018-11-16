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
import FullRestaurant from '../components/FullRestaurant'

import baseStyle from '../style/Base'

export default class RestaurantListScreen extends Component {

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
