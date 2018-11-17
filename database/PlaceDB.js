import Db from './RealmSchemas'
import RestaurantDB from './RestaurantDB'
import Services from '../services';
import WeatherDB from './WeatherDB';

export default PlaceDB = {
    insert: (place) => {
        let res = Db.objects('Place')
        if (Object.keys(res).length === 0){
            place.id = 1
        }else{
            res = res.sorted('id', true)
            place.id = res[0].id + 1

        }

        place.restaurants.forEach(restaurant => {
            RestaurantDB.insert(restaurant)
        });

        if (place.weather) {
            WeatherDB.insert(place.weather)
        }

        Db.write(() => Db.create('Place', place, true))
    },
    select: (id) => {
        let res = Db.objects('Place').filtered('id = $0', id)
        return Object.keys(res).length !== 0 ? res[0] : null
    }  
}