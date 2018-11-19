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
import Swipeout from 'react-native-swipeout' 

import Travel from '../components/Travel'
import TextEmptyList from '../components/TextEmptyList'

import UserDB from '../database/UserDB'
import TravelDB from '../database/TravelDB'

import baseStyle from '../style/Base'
import {PRIMARY_COLOR} from '../Constants'
import Util from '../Utilities';

export default class HomeScreen extends Component {

    /*static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <IconMaterial.Button name="plus" size={30} backgroundColor='transparent' color={PRIMARY_COLOR} onPress={() => navigation.navigate('Travel', {cmd:0})} />
            )
        }
    }*/

    constructor(props) {
        super(props)

        let travelsCollection = TravelDB.selectAll(UserDB.selectCache())
        travelsCollection.addListener((travels, changes) => {
            changes.modifications.forEach(index => {
                let travelM = travels[index]
                let cTravelList = this.state.travelList
                let travelIndex = -1
                cTravelList.forEach((travel, index) => {
                    if (travel.id == travelM.id) {
                        travelIndex = index
                        return
                    }
                })
                if (travelIndex > -1) {
                    cTravelList.splice(travelIndex, 1, travelM)
                    this.setState({ travelList: cTravelList })
                }
            })

            changes.deletions.forEach(index => {
                let cTravelList = this.state.travelList
                cTravelList.splice(index, 1)
                this.setState({ travelList: cTravelList })
            })
        })
        let travels = Object.keys(travelsCollection).length == 0 ? [] : travelsCollection.map(x => Object.assign({}, x))

        this.state = {
            travelList: travels,
            openedMenu: false
        }
    }

    render() {
        return (
            <View style={baseStyle.container}>
                <FlatList
                    data={this.state.travelList}
                    renderItem={({ item }) => 
                        <Swipeout autoClose backgroundColor='white' right={[{text:'Alterar', type:'primary', onPress: () => this._alter(item)}, {text:'Excluir', type:'delete', onPress: () => this._delete(item)}]}>
                            <Travel travel={item} onSeeMore={(place) => this._touchSeeMoreRestaurants(Util.mapToList(place.restaurants))} />
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

    _delete = (travel) => {
        Alert.alert('Atenção', 'Tem certeza que deseja apagar essa viagem?',
        [
            { text: 'Cancelar' },
            { text: 'Sim', onPress: () => TravelDB.delete(travel)}
        ])
    }

    _alter = (travel) => {
        this.props.navigation.navigate('Travel', {cmd:1, travel})
    }

    _touchAllTravels = () => {
        this.props.navigation.navigate('Login')
    }

    _touchSeeMoreRestaurants = (restaurants) => {
        this.props.navigation.navigate('RestaurantList', { restaurants })
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }
}
