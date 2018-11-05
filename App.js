/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import Home from './interfaces/HomeScreen'
import Login from './interfaces/LoginScreen'
import Register from './interfaces/RegisterScreen'
import Forgot from './interfaces/ForgotScreen'
import Travel from './interfaces/TravelScreen'
import TravelList from './interfaces/TravelListScreen'
import PlaceAdd from './interfaces/PlaceAddScreen'
import {createStackNavigator} from 'react-navigation'

export default createStackNavigator(
	{
		Home : {
			screen: Home,
			navigationOptions:{
				title: 'Home',
				headerLeft: null
			}
		},
		Login:{
            screen: Login,
            navigationOptions:{header:null}
		},
		Register: {
			screen: Register,
			navigationOptions: { 
				title:'Cadastro'
			}
		},
		Forgot: {
			screen: Forgot,
			navigationOptions: {
				title: 'Esqueci minha senha'
			}
		},
		Travel: {
			screen: Travel
		},
		TravelList: {
			screen: TravelList,
			navigationOptions: {
				title: 'Viagens'
			}
		},
		PlaceAdd: {
			screen: PlaceAdd,
			navigationOptions:{
				title:'Local'
			}
		}
	}, {
		initialRouteName: ('Login'),
		modal: 'modal'
	}
)
