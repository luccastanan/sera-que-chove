
import React, {Component} from 'react'
import {FlatList, View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native'

import {Button, Input} from 'react-native-elements'
import RNGooglePlaces from 'react-native-google-places'
import DatePicker from 'react-native-datepicker'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconMaterialCM from 'react-native-vector-icons/MaterialCommunityIcons'

import baseStyles from '../style/Base'
import { PRIMARY_COLOR } from '../Constants'
import Util from '../Utilities';

export default class PlaceAddScreen extends Component {

    /*static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <IconMaterialCM.Button name="check" size={30} backgroundColor='transparent' color={PRIMARY_COLOR} onPress={() => navigation.getParam('touchAdd')()} />
            )
        }
    }*/

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
                {this._datePicker()}
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
                    address: place.address,
                    latitude: place.latitude,
                    longitude: place.longitude
                })
            })
            .catch(error => console.log(error.message)); 
    }

    _datePicker = () => {
        return <DatePicker
            date={this.state.date}
            mode="date"
            placeholder="Data"
            format="DD/MM/YYYY"
            minDate={new Date()}
            confirmBtnText="Ok"
            cancelBtnText="Cancelar"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0 
                },
                dateInput: {
                    borderWidth:0,
                    borderBottomWidth:1,
                }
            }}
            iconComponent={<IconMaterial name="date-range" size={30} color={PRIMARY_COLOR} />}
            onDateChange={(date) => {
                const dateS = date.split('/')
                this.setState({ date: new Date(dateS[2], dateS[1]-1, dateS[0]) })
            }}
        />
    }

    _touchAdd = () => {
        this.props.navigation.getParam('handleAdd')(this.state)
        this.props.navigation.goBack()
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
    panel:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    buttons:{
        flexDirection:'row'
    },
    btnPositive:{
        flex:1
    }
})