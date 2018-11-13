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
import RestaurantList from './interfaces/RestaurantListScreen'
import {createStackNavigator} from 'react-navigation'

import {PRIMARY_COLOR} from './Constants'

export default createStackNavigator(
	{
		Home : {
			screen: Home,
			navigationOptions:{
				title: 'Home',
				headerLeft: null,
				headerTintColor: PRIMARY_COLOR,
				headerTitleStyle: {
					color: PRIMARY_COLOR
				}
			}
		},
		Login:{
            screen: Login,
            navigationOptions:{header:null}
		},
		Register: {
			screen: Register,
			navigationOptions: { 
				title: 'Cadastro',
				headerTintColor: PRIMARY_COLOR,
				headerTitleStyle: {
					color: PRIMARY_COLOR
				}
			}
		},
		Forgot: {
			screen: Forgot,
			navigationOptions: {
				title: 'Esqueci minha senha',
				headerTintColor: PRIMARY_COLOR,
				headerTitleStyle: {
					color: PRIMARY_COLOR
				}
			}
		},
		Travel: {
			screen: Travel,
			navigationOptions: {
				headerTintColor: PRIMARY_COLOR,
				headerTitleStyle: {
					color: PRIMARY_COLOR
				}
			}
		},
		TravelList: {
			screen: TravelList,
			navigationOptions: {
				title: 'Viagens',
				headerTintColor: PRIMARY_COLOR,
				headerTitleStyle: {
					color: PRIMARY_COLOR
				}
			}
		},
		PlaceAdd: {
			screen: PlaceAdd,
			navigationOptions:{
				title: 'Local',
				headerTintColor: PRIMARY_COLOR,
				headerTitleStyle: {
					color: PRIMARY_COLOR
				}
			}
		},
		RestaurantList: {
			screen: RestaurantList,
			navigationOptions: {
				title: 'Restaurantes',
				headerTintColor: PRIMARY_COLOR,
				headerTitleStyle: {
					color: PRIMARY_COLOR
				}
			}
		}
	}, {
		initialRouteName: ('Login'),
		modal: 'modal'
	}
)
