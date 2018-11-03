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

import { URL, WEATHER_KEY} from '../Constants'

import Util from '../Utilities'

type Props = {};
class HomeScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            openedMenu:false,
            closestTravel:[],
            currentWeather: 24,
            currentMax: 28,
            currentMin:22,
            tomorrowWeather: 16,
            tomorrowMax: 22,
            tomorrowMin: 14
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
                        <Text style={styles.panelCurrent}>{this.state.currentWeather}</Text>
                        <View style={styles.panelMM}>
                            <Text>▲ {this.state.currentMax}º</Text>
                            <Text>▼ {this.state.currentMin}º</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.panelBottom}>
                        <View style={styles.panelBottomDesc}>
                            <Text>Amanhã</Text>
                        </View> 
                    <View style={styles.panelBottomWeather}>
                        <Text style={styles.panelBottomCurrent}>{this.state.tomorrowWeather}</Text>
                        <View style={styles.panelBottomMM}>
                            <Text>▲ {this.state.tomorrowMax}º</Text>
                            <Text>▼ {this.state.tomorrowMin}º</Text>
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
        fetch(`${URL}?q=Londrina,br&appid=${WEATHER_KEY}`)
        .then(resp => {
            if (!resp.ok) 
                throw new Error('Problema na requisição')
            return resp.json()
        }).then(body => {
            this.setState(
                {
                    currentWeather: Util.kToC(body.main.temp),
                    currentMax: Util.kToC(body.main.temp_max),
                    currentMin: Util.kToC(body.main.temp_min)
                }
            )
        }).catch(error => {
            console.log(error.toString())
        })
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
