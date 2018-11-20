import Db from './RealmSchemas'

export default TravelDB = {
    insert: (travel) => {
        let res = Db.objects('Travel')
        if (Object.keys(res).length === 0){
            travel.id = 1
        }else{
            res = res.sorted('id', true)
            travel.id = res[0].id + 1
        }

        Db.write(() => Db.create('Travel', travel, true))
    },
    select: (id) => {
        let res = Db.objects('Travel').filtered('id = $0', id)
        return Object.keys(res).length !== 0 ? res[0] : null
    },
    selectAll: (user) => {
        /*let res = Db.objects('Travel').filtered('user = $0', user)
        return Object.keys(res).length !== 0 ? res : null*/
        return Db.objects('Travel').filtered('user = $0', user)
    },
    delete: (travel) => {
        Db.write(() => Db.delete(TravelDB.select(travel.id)))
    },
    update: (travel) => {
        Db.write(() => {
            let uTravel = Db.objectForPrimaryKey('Travel', travel.id)
            uTravel.places = travel.places
            uTravel.startDate = travel.startDate
            uTravel.endDate = travel.endDate
        })
    },
    selectTravelInProgressAndFuture: (user) => {
        //return Db.objects('Travel').filtered('user = $0 AND endDate > $1', user, new Date())
        return Db.objects('Travel').filtered('user = $0', user)
    }
}