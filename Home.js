    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     *
     * @format
     * @flow
     */

    import React, {Component} from 'react';
    import {Platform, StyleSheet, Text, View, FlatList, Button, TouchableOpacity} from 'react-native';

    import Orientation from 'react-native-orientation'
    import { red } from 'ansi-colors';

    import Travel from './components/Travel'

    type Props = {};
    export default class Home extends Component<Props> {

    constructor() {
        super();
        this.state = {
        dataSource: [{ title: 'Title Text', key: 'item1' }, 
        { title: 'Title Text2', key: 'item2' }, 
            { title: 'Title Text3', key: 'item3' },
            { title: 'Title Text4', key: 'item4' },
            { title: 'Title Text5', key: 'item5' },
            { title: 'Title Text6', key: 'item6' },
            { title: 'Title Text7', key: 'item7' },
            { title: 'Title Text8', key: 'item8' },
            { title: 'Title Text9', key: 'item9' }]
        };
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.panel}>
                <View style={styles.panelContent}>
                    <Text>Londrina</Text>
                    <Text>* 24</Text>
                    <Text>▲ 28º</Text>
                    <Text>▼ 22º</Text>
                </View>
                <View style={styles.panelBottom}>
                        <View style={styles.panelBottomDesc}>
                            <Text>Amanhã</Text>
                        </View> 
                    <View style={styles.panelBottomWeather}>
                        <Text>* 16</Text>
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
            <TouchableOpacity>
                <Text>Ver todas</Text>
            </TouchableOpacity>
        </View>
        );
    }

    _handleSeeMore = () => {

    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }
    }

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
