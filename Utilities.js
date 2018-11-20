import { KELVIN, STORAGE } from "./Constants"
import { AsyncStorage} from 'react-native'

//const createReactClass = require('create-react-class')

export default Utilities = {
    kToC: (k) => {
        return Math.round(k - KELVIN)
    },
    mapToList: (m) => m.map(x => Object.assign({}, x)),
    differenceOfDatesInDays: (date1, date2) => {
        let differenceS = date1 - date2
        let diff = Math.ceil(differenceS / 86400000)
        return diff < 0 ? 0 : diff
    },
    asyncForEach: async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array)
        }
    },
    dateFormat: (date, mode) => {
        let res = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}` 
        if (mode == 1) 
            res += `  ${date.getHours()}:${date.getMinutes()}`
        return res 
    },
    stringFormat: (str, count, sym) => {
        while (str.length < count) 
            str = sym + str
        return sym
    }, getStorage: async (key, def) => {
        let value = await AsyncStorage.getItem(STORAGE + key)
        return value ? value : def
    },
    setStorage: async (key, value) => await AsyncStorage.setItem(STORAGE + key, value)
}