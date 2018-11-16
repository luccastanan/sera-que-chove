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
        Db.write(() => Db.delete(TravelServices.select(travel.id)))
    }
}