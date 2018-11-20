
import React, {Component} from 'react'
import {View, StyleSheet, Alert} from 'react-native'

import {Button, Input} from 'react-native-elements'
import RNGooglePlaces from 'react-native-google-places'

import baseStyles from '../style/Base'
import { PRIMARY_COLOR } from '../Constants'
import Util from '../Utilities';
import InputDate from '../components/InputDate';

export default class PlaceAddScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            address: '',
            latitude: '',
            longitude: '', 
            date: null
        }
    }

    render(){
        return <View style={baseStyles.container}>
            <View style={styles.panel}>
                <Input
                    value={this.state.address}
                    leftIcon={{ type: 'material-icons', name: 'place', color: PRIMARY_COLOR }}
                    containerStyle={baseStyles.input}
                    placeholder='Endereço de destino'
                    onFocus={() => this._findPlace()}
                />
                <InputDate
                    placeholder='Data'
                    minimumDate={new Date()}
                    onSelected={(date) => this.setState({ date })}
                    mode='datetime'
                />
            </View>

            <Button
                title='Adicionar'
                buttonStyle={baseStyles.btnPositive}
                containerStyle={baseStyles.containerBtn}
                onPress={() => this._touchAdd()}
            />
        </View>
    }

    _findPlace = () => {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                this.setState({
                    name:place.name,
                    address: place.address,
                    latitude: place.latitude,
                    longitude: place.longitude
                })
            })
            .catch(error => console.log(error.message)); 
    }

    _touchAdd = () => {
        if (this.state.address == '' || this.state.date == null) {
            Alert.alert('Dados faltandos', 'Todos os campos são obrigatórios')            
        }else{
            this.props.navigation.goBack()
            this.props.navigation.getParam('handleAdd')(this.state)
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({ touchAdd: () => this._touchAdd() })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:8,
        alignItems: 'center',
        justifyContent:'center'
    },
    panel: {
        flex: 1,
        width: 300,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttons:{
        flexDirection:'row'
    },
    btnPositive:{
        flex:1
    }
})