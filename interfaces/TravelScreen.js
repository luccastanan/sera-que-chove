
import React, {Component} from 'react'
import {FlatList, View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native'

import {Button, FormInput} from 'react-native-elements'

import SimplePlace from '../components/SimplePlace'

//import Modal from 'react-native-modal'

type Props = {}
export default class TravelScreen extends Component<Props> {

    constructor(props){
        super(props)
        this.state={
            visibleModal: false,
            address: '',
            date: '',
            places:[
                {
                    address: 'R. Jacarandá, 13 - Londrina/PR',
                    date: '10/04/17'
                },
                {
                    address: 'Av. Leste Oeste, 345 - Londrina/PR',
                    date: '11/04/17'
                },
                {
                    address: 'R. Matanha, 32 - São Paulo/SP',
                    date: '12/04/17'
                }
            ]
        }
    }

    render(){
        return <View style={styles.container}>
            <FlatList
                data={this.state.places}
                renderItem={ place => <SimplePlace {...place} />}
                keyExtractor={(item, index) => index.toString()}
                style={{ flex: 1 }}
            />
            <Button title='Adicionar local'
                onPress={() => this.setState({ visibleModal: true })}
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
                    onChangeText={text => this.setState({address: text})} />
                <FormInput
                    placeholder='Data'
                    onChangeText={text => this.setState({date: text})} />
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
                    date: this.state.date
                }],
            address:'',
            date:'',
            visibleModal:false
        })
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