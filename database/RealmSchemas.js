import Realm from 'realm'
export const USER_SCHEMA = 'User'
const TRAVEL_SCHEMA = 'Travel'
const PLACE_SCHEMA = 'Place'
const RESTAURANT_SCHEMA = 'Restaurant'
const WEATHER_SCHEMA = 'Weather'
const NOTIFICATION_SCHEMA = 'Notification'

const UserSchema = {
    name: USER_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        email: 'string',
        pass: 'string',
        /*date_birth: 'date',*/
        dateBirth: 'string',
        phone: 'string'
    }
}

/*export const TravelSchema = {
    name: TRAVEL_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        users: (USER_SCHEMA + '[]')
    }
}

export const WeatherSchema = {
    name: WEATHER_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        current: 'int',
        max: 'int',
        min: 'int'
    }
}

export const PlaceSchema = {
    name: PLACE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        address: 'string',
        date: 'date',
        weather: WEATHER_SCHEMA + '?',
        travel: TRAVEL_SCHEMA
    }
}

export const RestaurantSchema = {
    name: RESTAURANT_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: 'string',
        description: 'string',
        address: 'string',
        image: 'string?',
        place: PLACE_SCHEMA
    }
}

export const NotificationSchema = {
    name: NOTIFICATION_SCHEMA,
    primaryKey: 'id',
    properties: {
        level: 'int',
        message: 'string',
        status: 'int',
        place: PLACE_SCHEMA
    }
}*/

const schemas = [UserSchema/*, 
                TRAVEL_SCHEMA, 
                PLACE_SCHEMA, 
                RESTAURANT_SCHEMA, 
                WEATHER_SCHEMA, 
                NOTIFICATION_SCHEMA*/]

export default new Realm({schema : schemas})


