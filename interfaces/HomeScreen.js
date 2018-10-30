    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     *
     * @format
     * @flow
     */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import Orientation from 'react-native-orientation'
import { red } from 'ansi-colors';
import {Button} from 'react-native-elements'

import Icon from 'react-native-vector-icons/SimpleLineIcons'

import Travel from '../components/Travel'
import TravelListScreen from './TravelListScreen'

import { DrawerNavigator } from 'react-navigation'

import UserServices from '../database/UserServices'

type Props = {};
class HomeScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            openedMenu:false,
            closestTravel:[]
        };

        console.log(UserServices.selectCache())
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.panel}>
                <View style={styles.panelContent}>
                    <View style={styles.panelHeader}>
                        <Icon.Button name="menu" size={22} backgroundColor='transparent' onPress={() => this.props.navigation.openDrawer()}  />
                        <Text>Londrina</Text>
                    </View>
                    <View style={styles.panelWeather}>
                        <Text style={styles.panelCurrent}>* 24</Text>
                        <View style={styles.panelMM}>
                            <Text>▲ 28º</Text>
                            <Text>▼ 22º</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.panelBottom}>
                        <View style={styles.panelBottomDesc}>
                            <Text>Amanhã</Text>
                        </View> 
                    <View style={styles.panelBottomWeather}>
                        <Text style={styles.panelBottomCurrent}>* 16</Text>
                        <View style={styles.panelBottomMM}>
                            <Text>▲ 28º</Text>
                            <Text>▼ 22º</Text>
                        </View>
                    </View>
                </View>
            </View>
            <FlatList horizontal
                data={this.state.closestTravel}
                renderItem={({ travel }) => <Travel travel={travel}/>}
                keyExtractor={(item,index) => index.toString()}
                style={{flex:1}}
                />
        </View>
        );
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }
}

export default DrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Início'
        }
    },
    TravelList: {
        screen: TravelListScreen,
        navigationOptions: {
            title: 'Viagens'
        }
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    panel: {
        height:200,
        backgroundColor:'gray'
    },
    panelContent:{
        flex:1
    },
    panelHeader:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    panelWeather:{
        flex:1,
        alignSelf:'center',
        alignContent:'center',
        justifyContent:'center'
    }, 
    panelCurrent:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:32
    },
    panelMM:{
        flexDirection:'row'
    },
    panelBottom: {
        height:40,
        backgroundColor:'#3498DB',
        flexDirection: 'row'
    },
    panelBottomDesc:{
        flex:1
    },
    panelBottomWeather: { 
        flexDirection: 'row' 
    }, 
    panelBottomMM:{
        flexDirection:'column'
    }
});
