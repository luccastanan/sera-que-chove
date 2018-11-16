
import React, {Component} from 'react'
import {FlatList, View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'

import {Button, FormInput} from 'react-native-elements'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import Swipeout from 'react-native-swipeout' 
import {ProgressDialog} from 'react-native-simple-dialogs'

import SimplePlace from '../components/SimplePlace'
import PlaceDB from '../database/PlaceDB'

import TextEmptyList from '../components/TextEmptyList'
import baseStyles from '../style/Base'
import { PRIMARY_COLOR, FIND_PLACES_URL, GOOGLE_KEY } from '../Constants'
import UserDB from '../database/UserDB'
import TravelDB from '../database/TravelDB'
import Services from '../services';
import Util from '../Utilities';

export default class TravelScreen extends Component{

    static navigationOptions = ({ navigation }) => {
        return ({
            title:(navigation.getParam('cmd', 0) == 0 ? 'Nova viagem' : 'Viagem'),
            headerRight: (
                <Button
                    title='REGISTRAR'
                    onPress={() => navigation.getParam('touchRegister')()}
                    titleStyle={baseStyles.btnNegativeText}
                    buttonStyle={baseStyles.btnNegative}
                    containerStyle={baseStyles.containerBtn}/>
            )
        })
    }

    constructor(props){
        super(props)
        this.state={
            places: [],
            loading: false,
            loadingMessage:''
        }
    }

    render(){
        return <View style={baseStyles.container}>
            <FlatList
                data={this.state.places}
                renderItem={ ({item, index}) => (
                    <SimplePlace place={item} delete={() => this._delete(index)} />
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

            <ProgressDialog
                visible={this.state.loading}
                title="Aguarde"
                message={this.state.loadingMessage + '...'}
                titleStyle={{ color: PRIMARY_COLOR }}
                messageStyle={{color:PRIMARY_COLOR}}
            />
        </View>
    }

    componentWillMount(){
        this.props.navigation.setParams({ touchRegister: () => this._touchRegister(), loading: this.state.loading })
    }

    _delete = (index) => {
        let cPlaces = this.state.places
        cPlaces.splice(index, 1)
        this.setState({places: cPlaces})
    }

    _touchAddPlace = () => this.props.navigation.navigate('PlaceAdd', { handleAdd: (place) => this._loadRestaurants(place) })

    _loadRestaurants = (place) => {
        place.restaurants = []
        place.weather = null
        place.notifications = []

        this.setState({loadingMessage: 'Carregando restaurantes próximos', loading: true})

        Services.restaurants(place)
            .then(place => {
                this._savePlace(place)
            }).catch(error => {
                console.log(error)
                Alert.alert('Atenção', 'Problema ao obter restaurantes próximo desse local')
                this._savePlace(place)
            })
    }

    _savePlace = (place) => {
        this.setState(prevState => {
            const orderItems = [...prevState.places, place]
            orderItems.sort((a, b) => new Date(a.date) - new Date(b.date))
            return { places: orderItems }
        }, () => this.setState({ loading: false }))
        /*this.setState({
            places: [...this.state.places, place]
        }, () => this.setState({loading:false}))*/
    }

    _touchRegister = async () => {
        
        if (this.state.places.length == 0){
            Alert.alert('Atenção','É necessário adicionar pelo menos um local no roteiro da viagem')
        }else{
            await Util.asyncForEach(this.state.places, async (e, i) => {
                let differenceDays = Util.differenceOfDatesInDays(e.date, new Date())
                await Services.forecast(e.latitude, e.longitude, differenceDays)
                    .then(forecast => {
                        e.weather = forecast
                    }).catch(error => {
                        console.log(error.toString())
                    })
                PlaceDB.insert(e)
                this.setState(prevState => {
                    const newItems = [...prevState.places]
                    newItems[i] = e
                    return { places: newItems }
                })
            })

            let travel = {
                user: UserDB.selectCache(),
                places: this.state.places
            }
            TravelDB.insert({...travel})

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