
import React, {Component} from 'react'
import {FlatList, View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native'

import {Button, FormInput} from 'react-native-elements'

import SimplePlace from '../components/SimplePlace'

import TravelServices from '../database/TravelServices'

import PlaceServices from '../database/PlaceServices'
import UserServices from '../database/UserServices'


type Props = {}
export default class TravelScreen extends Component<Props> {

    constructor(props){
        super(props)
        this.state={
            visibleModal: false,
            address: '',
            date: '',
            places: []
        }
    }

    render(){
        return <View style={styles.container}>
            <FlatList
                data={this.state.places}
                renderItem={ ({item}) => <SimplePlace place={item} />}
                keyExtractor={(item, index) => index.toString()}
                style={{ flex: 1 }}
            />
            <Button title='Adicionar local'
                onPress={() => this.setState({ visibleModal: true })}
            />
            <Button title='Registrar'
                onPress={() => this._touchSave()}
            />

            <Modal visible={this.state.visibleModal} 
                onRequestClose={() => this.setState({visibleModal:false})}
                transparent >
                {this._createModal()}
            </Modal>
        </View>
    }

    _createModal = () => {
        return <View style={styles.modal}>
            <View style={styles.modalContainer}>
                <Text>Local</Text>
                <FormInput
                    placeholder='Endereço'
                    onChangeText={(address) => this.setState({address})} />
                <FormInput
                    placeholder='Data'
                    onChangeText={(date) => this.setState({date})} />
                <View style={styles.buttons}>
                    <Button 
                        style={styles.btnNeutral}
                        title='Cancelar'
                        onPress={() => this.setState({visibleModal:false})}
                        />
                    <Button
                        style={styles.btnPositive}
                        title='Adicionar'
                        onPress={() => this._touchAdd()}
                        />
                </View>
            </View>
        </View>
    }

    _touchAdd = () => {
        this.setState({
            places: [...this.state.places,
                {
                    address: this.state.address,
                    date: this.state.date,
                    restaurants: [],
                    weather: null,
                    notifications: []
                }],
            address: '',
            date: '',
            visibleModal: false})
    }

    _touchSave = () => {
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:8
    },
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
    },
    buttons:{
        flexDirection:'row',
        flex:1,
    },
    btnNeutral:{
        width:'50%'
    },
    btnPositive:{
        width:'50%'
    }
})