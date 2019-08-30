
import React, { Component } from 'react'
import { View, StyleSheet, Alert, Text } from 'react-native'

import { Button, Input } from 'react-native-elements'
//import RNGooglePlaces from 'react-native-google-places'

import baseStyles from '../style/Base'
import { PRIMARY_COLOR } from '../constants'
import InputDate from '../components/InputDate';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


export default class PlaceAddScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            address: '',
            latitude: '',
            longitude: '',
            date: null
        }
    }

    render() {
        return <View style={baseStyles.container}>
            <View style={styles.panel}>
                <Input
                    value={this.state.address}
                    leftIcon={{ type: 'material-icons', name: 'place', color: PRIMARY_COLOR }}
                    containerStyle={baseStyles.input}
                    placeholder='Endereço de destino'
                    //onFocus={() => this._findPlace()}
                    onChangeText={address => this.setState({ address })}
                />
                <InputDate
                    placeholder='Data'
                    minimumDate={new Date()}
                    onSelected={(date) => this.setState({ date })}
                    mode='datetime'
                />
            </View>

            <View style={{height:200}}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}

                    getDefaultValue={() => ''}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyDvvYRcgyqeZaQB9cHcSYLbWUSBQp1iYrI',
                        language: 'pt', // language of the results
                        types: '(cities)' // default: 'geocode'
                    }}

                    styles={{
                        textInputContainer: {
                            width: '100%'
                        },
                        description: {
                            fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        }
                    }}

                    currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        type: 'cafe'
                    }}

                    GooglePlacesDetailsQuery={{
                        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                        fields: 'formatted_address',
                    }}

                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    predefinedPlaces={[homePlace, workPlace]}

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    //renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
                    renderRightButton={() => <Text>Custom text after the input</Text>}
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
        /* RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                this.setState({
                    name:place.name,
                    address: place.address,
                    latitude: place.latitude,
                    longitude: place.longitude
                })
            })
            .catch(error => console.log(error.message));  */
    }

    _touchAdd = () => {
        if (this.state.address == '' || this.state.date == null) {
            Alert.alert('Dados faltandos', 'Todos os campos são obrigatórios')
        } else {
            this.props.navigation.goBack()
            this.props.navigation.getParam('handleAdd')(this.state)
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({ touchAdd: () => this._touchAdd() })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    panel: {
        flex: 1,
        width: 300,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttons: {
        flexDirection: 'row'
    },
    btnPositive: {
        flex: 1
    }
})