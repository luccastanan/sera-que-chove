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
type Props = {};
export default class HomeScreen extends Component<Props> {

    constructor() {
        super();
        this.state = {
            dataSource: [{ title: 'Title Text', key: 'item1' },
            { title: 'Title Text2', key: 'item2' },
            { title: 'Title Text3', key: 'item3' },
            { title: 'Title Text4', key: 'item4' },
            { title: 'Title Text5', key: 'item5' },
            { title: 'Title Text6', key: 'item6' },
            { title: 'Title Text7', key: 'item7' },
            { title: 'Title Text8', key: 'item8' },
            { title: 'Title Text9', key: 'item9' }],
            openedMenu: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => <Travel text={item.title} />}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ flex: 1 }}
                />
                <ActionButton 
                    buttonColor="rgba(231,76,60,1)" 
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
