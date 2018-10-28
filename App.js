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
import {createStackNavigator} from 'react-navigation'

import { Icon } from 'react-native-elements'

export default createStackNavigator(
	{
		Home : {
			screen: Home,
			navigationOptions:{
				title:'Home'
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
			screen: Travel,
			navigationOptions: {
				title: 'Viagem'
			}
		}
	}, {
		initialRouteName: ('Travel'),
		modal: 'modal'
	}
)
