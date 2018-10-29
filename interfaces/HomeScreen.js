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

type Props = {};
class HomeScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [{ title: 'Title Text', key: 'item1' }, 
            { title: 'Title Text2', key: 'item2' }, 
                { title: 'Title Text3', key: 'item3' },
                { title: 'Title Text4', key: 'item4' },
                { title: 'Title Text5', key: 'item5' },
                { title: 'Title Text6', key: 'item6' },
                { title: 'Title Text7', key: 'item7' },
                { title: 'Title Text8', key: 'item8' },
                { title: 'Title Text9', key: 'item9' }],
            openedMenu:false
        };

        console.log(props.navigation.state.params.user)
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
                        <Text style={styles.panelCurrent}>* 24</Text>
                        <View style={styles.panelMM}>
                            <Text>▲ 28º</Text>
                            <Text>▼ 22º</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.panelBottom}>
                        <View style={styles.panelBottomDesc}>
                            <Text>Amanhã</Text>
                        </View> 
                    <View style={styles.panelBottomWeather}>
                        <Text style={styles.panelBottomCurrent}>* 16</Text>
                        <View style={styles.panelBottomMM}>
                            <Text>▲ 28º</Text>
                            <Text>▼ 22º</Text>
                        </View>
                    </View>
                </View>
            </View>
            <FlatList horizontal
                data={this.state.dataSource}
                renderItem={({ item }) => <Travel text={item.title}/>}
                keyExtractor={(item,index) => index.toString()}
                style={{flex:1}}
                />
        </View>
        );
    }

    componentDidMount() {
        Orientation.lockToPortrait();
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
