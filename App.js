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
import {createStackNavigator} from 'react-navigation'

export default createStackNavigator(
	{
		Home : {
			screen: Home,
			navigationOptions:{header: null}
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
		}
	}, {
		initialRouteName: ('Login'),
		modal: 'modal'
	}
)
