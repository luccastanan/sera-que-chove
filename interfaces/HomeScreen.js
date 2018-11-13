/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ImageBackground, Dimensions } from 'react-native';

import Orientation from 'react-native-orientation'
import IconSimple from 'react-native-vector-icons/SimpleLineIcons'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dropdown } from 'react-native-material-dropdown';
import { Button} from 'react-native-elements'

import Travel from '../components/Travel'
import UserServices from '../database/UserServices'
import { WEATHER_URL, WEATHER_KEY, PRIMARY_COLOR } from '../Constants'
import Util from '../Utilities'
import baseStyles from '../style/Base'



const menuOptions = [{
    value: 'Nova viagem',
}, {
    value: 'Configurações',
}]

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openedMenu: false,
            closestTravel: [],
            currentWeather: 24,
            currentMax: 28,
            currentMin: 22,
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
                    <ImageBackground
                        source={require('../img/forest.jpg')}
                        style={{ height: imageHeight, width: imageWidth }}>
                        {/*<View style={{ backgroundColor: '#00000059', flex: 1 }} />*/}
                        <View style={styles.panelContent}>
                            <View style={styles.panelHeader}>
                                <Text style={[styles.weatherText, styles.h4]}>Londrina</Text>
                            </View>
                            <View style={styles.panelWeather}>
                                <Text style={[styles.weatherText, styles.panelCurrent]}>{this.state.currentWeather}</Text>
                                <View style={styles.panelMM}>
                                    <Text style={styles.weatherText}>▲ {this.state.currentMax}º</Text>
                                    <Text style={styles.weatherText}>▼ {this.state.currentMin}º</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.panelBottom}>
                            <View style={styles.panelBottomDesc}>
                                <Text style={[styles.weatherText, styles.h4]}>Amanhã</Text>
                            </View>
                            <View style={styles.panelBottomWeather}>
                                <Text style={[styles.weatherText, {fontSize:24, fontWeight:'bold', marginEnd:8}]}>{this.state.tomorrowWeather}</Text>
                                <View style={styles.panelBottomMM}>
                                    <Text style={styles.weatherText}>▲ {this.state.tomorrowMax}º</Text>
                                    <Text style={styles.weatherText}>▼ {this.state.tomorrowMin}º</Text>
                                </View>
                            </View>
                        </View>                
                    </ImageBackground >
                </View>
                <FlatList horizontal
                    data={this.state.closestTravel}
                    renderItem={({ travel }) => <Travel travel={travel} />}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ flex: 1 }}
                />
                <Button
                    title='VER TODAS'
                    buttonStyle={baseStyles.btnPositive}
                    containerStyle={baseStyles.containerBtn}
                    onPress={() => this.props.navigation.navigate('TravelList')}
                />
            </View>
        );
    }

    componentDidMount() {
        Orientation.lockToPortrait();
        fetch(`${WEATHER_URL}?q=Londrina,br&appid=${WEATHER_KEY}`)
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

        this.props.navigation.setParams({onSelected: (text) =>this._menuSelected(text)})
    }

    _menuSelected = (text) => {
        switch (text) {
            case 'Nova viagem':
                this.props.navigation.navigate('Travel', { cmd: 0 })
                break
            case 'Configurações':
                break
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerRight: (
                <Dropdown data={menuOptions}
                    rippleInsets={{ top: 4, bottom: 0, left: 0, right: 8 }}
                    containerStyle={{ width: 50, height: 50 }}
                    dropdownPosition={1}
                    itemColor="rgba(0, 0, 0, .87)"
                    pickerStyle={{
                        width: 136,
                        left: null,
                        right: 0,
                        marginRight: 8,
                        marginTop: 28
                    }}
                    textColor={PRIMARY_COLOR}
                    renderBase={() => <IconMaterial.Button name="dots-vertical" size={30} backgroundColor='transparent' color={PRIMARY_COLOR}/>}
                    onChangeText={(text) => navigation.getParam('onSelected')(text)}
                />
            )
        }
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
        flex: 1,
        padding:8
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
        height: 45,
        backgroundColor: '#3498DB',
        flexDirection: 'row',
        alignItems:'center',
        paddingStart:8,
        paddingTop:4,
        paddingEnd:8,
        paddingBottom:4
    },
    panelBottomDesc: {
        flex: 1
    },
    panelBottomWeather: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    panelBottomMM: {
        flexDirection: 'column'
    },
    weatherText:{
        color:'white'
    },
    h4:{
        fontSize:20
    }
});