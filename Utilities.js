import { KELVIN } from "./Constants";

const createReactClass = require('create-react-class')

export default createReactClass({
    statics:{
        kToC: (k) => {
            return Math.round(k - KELVIN)
        }
    },
    render:{

    }
})