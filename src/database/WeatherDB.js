import Db from './RealmSchemas'

export default WeatherDB = {
    insert: (weather) => {
        let res = Db.objects('Weather')
        if (Object.keys(res).length === 0){
            weather.id = 1
        }else{
            res = res.sorted('id', true)
            weather.id = res[0].id + 1
        }

        Db.write(() => Db.create('Weather', weather, true))
    },
    select: (id) => {
        let res = Db.objects('Weather').filtered('id = $0', id)
        return Object.keys(res).length !== 0 ? res[0] : null
    }  
}