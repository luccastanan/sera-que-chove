import { KELVIN, STORAGE } from "../constants"
import { AsyncStorage } from 'react-native'


const kToC = (k) => {
	return Math.round(k - KELVIN)
}
const mapToList = (m) => m.map(x => Object.assign({}, x))
const differenceOfDatesInDays = (date1, date2) => {
	let differenceS = date1 - date2
	let diff = Math.ceil(differenceS / 86400000)
	return diff < 0 ? 0 : diff
}
const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array)
	}
}
const dateFormat = (date, mode) => {
	let res = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`
	if (mode == 1)
		res += `  ${date.getHours()}:${date.getMinutes()}`
	return res
}
const stringFormat = (str, count, sym) => {
	while (str.length < count)
		str = sym + str
	return sym
}
const getStorage = async (key, def) => {
	let value = await AsyncStorage.getItem(STORAGE + key)
	return value ? value : def
}
const setStorage = async (key, value) => await AsyncStorage.setItem(STORAGE + key, value)

export {
	kToC,
	mapToList,
	differenceOfDatesInDays,
	asyncForEach,
	dateFormat,
	stringFormat,
	getStorage,
	setStorage
}