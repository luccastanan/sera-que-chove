import Db from './RealmSchemas'

export default RestaurantServices = {
    insert: (restaurant) => {
        let res = Db.objects('Restaurant')
        if (Object.keys(res).length === 0){
            restaurant.id = 1
        }else{
            res = res.sorted('id', true)
            restaurant.id = res[0].id + 1
        }

        Db.write(() => Db.create('Restaurant', restaurant, true))
    },
    select: (id) => {
        let res = Db.objects('Restaurant').filtered('id = $0', id)
        return Object.keys(res).length !== 0 ? res[0] : null
    }  
}