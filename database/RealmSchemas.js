import Realm from 'realm'
export const USER_SCHEMA = 'User'
export const CACHE_USER_SCHEMA = 'CacheUser'
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

const CacheUserSchema = {
    name: CACHE_USER_SCHEMA,
    properties: {
        idUser: 'int'
    }
}

const TravelSchema = {
    name: TRAVEL_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        user: USER_SCHEMA,
        places: (PLACE_SCHEMA + '[]')
    }
}

const PlaceSchema = {
    name: PLACE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        address: 'string',
        /*date: 'date',*/
        date: 'string',
        restaurants: (RESTAURANT_SCHEMA + '[]'),
        weather: (WEATHER_SCHEMA + '?'),
        notifications: (NOTIFICATION_SCHEMA + '[]')
    }
}

const WeatherSchema = {
    name: WEATHER_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        current: 'int',
        max: 'int',
        min: 'int'
    }
}

const RestaurantSchema = {
    name: RESTAURANT_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: 'string',
        rating: {type: 'float?', default:0},
        address: 'string',
        image: 'string?'
    }
}

const NotificationSchema = {
    name: NOTIFICATION_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        level: 'int',
        message: 'string',
        status: 'int'
    }
}

const schemas = [UserSchema,
                CacheUserSchema, 
                TravelSchema, 
                PlaceSchema, 
                RestaurantSchema, 
                WeatherSchema, 
                NotificationSchema]

export default new Realm({schema : schemas})


