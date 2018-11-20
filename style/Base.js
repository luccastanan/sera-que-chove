import {StyleSheet} from 'react-native'
import {PRIMARY_COLOR} from '../Constants'

export default StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
        justifyContent: 'center'
    },
    containerBtn:{
        margin: 8
    },
    btnPositive:{
        backgroundColor: PRIMARY_COLOR
    },
    btnNegative:{
        backgroundColor:'white'
    },
    btnNegativeText:{
        color:PRIMARY_COLOR
    },
    input: {
        /*borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        borderRadius: 30,
        marginBottom: 10*/
        marginBottom:8
    },
    dividerVertical:{
        borderEndWidth:1,
        borderEndColor:PRIMARY_COLOR
    },
    dividerHorizontal: {
        borderBottomWidth: 1,
        borderBottomColor: PRIMARY_COLOR
    }
})