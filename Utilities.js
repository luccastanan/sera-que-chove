import { KELVIN } from "./Constants";

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
            await callback(array[index], index, array);
        }
    }
}