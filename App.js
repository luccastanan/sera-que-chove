/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import Home from './Home'
import {createStackNavigator} from 'react-navigation'

export default createStackNavigator(
	{
		Home : {
			screen: Home,
			navigatorOptions:{header: null}
		}
	}, {
		initialRouteName: ('Home'),
		modal: 'modal'
	}
)
