
import React, {Component} from 'react'
import {FlatList, View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'

import {Button, FormInput} from 'react-native-elements'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import Swipeout from 'react-native-swipeout' 

import SimplePlace from '../components/SimplePlace'
import TravelServices from '../database/TravelServices'
import PlaceServices from '../database/PlaceServices'
import UserServices from '../database/UserServices'

import TextEmptyList from '../components/TextEmptyList'
import baseStyles from '../style/Base'
import { PRIMARY_COLOR } from '../Constants'

type Props = {}
export default class TravelScreen extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        return ({
            title:(navigation.getParam('cmd', 0) == 0 ? 'Nova viagem' : 'Viagem'),
            headerRight: (
                <IconMaterial.Button name="check" size={30} backgroundColor='transparent' color={PRIMARY_COLOR} onPress={() => navigation.getParam('touchRegister')()} />
            )
        })
    }

    constructor(props){
        super(props)
        this.state={
            places: [{
                address:'São Paulo/SP',
                date:'11/10/2018'
            }]
        }
    }

    render(){
        return <View style={baseStyles.container}>
            <FlatList
                data={this.state.places}
                renderItem={ ({item, index}) => (
                    <Swipeout backgroundColor='white' right={[{ text: 'Excluir', type: 'delete', onPress: () => this._delete(index) }]}>
                        <SimplePlace place={item} />
                    </Swipeout>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={{ flex: 1 }}
            />
            <TextEmptyList 
                style={{flex:1}}
                text='Sem locais salvos'
                visible={this.state.places.length == 0 ? true : false}
            />
            <Button
                title='Adicionar local'
                buttonStyle={baseStyles.btnPositive}
                containerStyle={baseStyles.containerBtn}
                onPress={() => this._touchAddPlace()} 
                />
        </View>
    }

    componentWillMount(){
        this.props.navigation.setParams({ touchRegister: () => this._touchRegister() })
    }

    _delete = (index) => {
        let cPlaces = this.state.places
        cPlaces.splice(index, 1)
        this.setState({places: cPlaces})
    }

    _touchAddPlace = () => this.props.navigation.navigate('PlaceAdd', { handleAdd: (place) => this._handlerAdd(place) })

    _handlerAdd = (place) => {
        this.setState({
            places: [...this.state.places,
                {
                    ...place,
                    restaurants: [],
                    weather: null,
                    notifications: []
                }]
            })
    }

    _touchRegister = () => {
        if (this.state.places.length == 0){
            Alert.alert('Atenção','É necessário adicionar pelo menos um local no roteiro da viagem')
        }else{
            this.state.places.forEach(item => {
                PlaceServices.insert(item)
            })
            let travel = {
                user: UserServices.selectCache(),
                places: this.state.places
            }
            TravelServices.insert({...travel})

            this.props.navigation.goBack()
        }
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000ad'
    },
    modalContainer: {
        width: 300,
        height: 170,
        backgroundColor: 'white',
        borderRadius: 2
    }
})