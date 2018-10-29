import Db from './RealmSchemas'

let UserServices = {
    insert: (user) => {
        let res = Db.objects('User')
        if (Object.keys(res).length === 0){
            user.id = 1
        }else{
            res = res.sorted('id', true)
            user.id = res[0].id + 1
        }

        Db.write(() => Db.create('User', user, true))
    },
    auth: (email, pass) => {
        console.log(Db.objects('User'))
        let res = Db.objects('User').filtered('email = "' + email + '" AND pass = "' + pass + '"')
        return Object.keys(res).length !== 0 ? res[0] : false
    }, 
    update: (user) => {
        Db.write(() => {
            let uUser = Db.objectForPrimaryKey('User', user.id)
            uUser.name = user.name
            uUser.email = user.email
            uUser.pass = user.pass
            uUser.date_birth = user.date_birth
            uUser.phone = user.phone
        })
    }
    
}

module.exports = UserServices

/*export const updateUser = (user) => new Promise((resolve, reject) => {
    Realm.open(dbOptions)
        .then(realm => {
            realm.write(() => {
                let uUser = realm.objectForPrimaryKey(USER_SCHEMA, user.id)
                uUser.name = user.name
                uUser.email = user.email
                uUser.pass = user.pass
                uUser.date_birth = user.date_birth
                uUser.phone = user.phone
                resolve()
            })
        }).catch(error => reject(error))
})*/

/*export const validateUser = (email, pass) => new Promise((resolve, reject) => {
        Realm.open(dbOptions)
            .then(realm => {
                let res = realm.objects(USER_SCHEMA).filtered(`email = ${email} AND pass = ${pass}`)
                resolve(res ? true : false)
            }).catch(error => reject(error))
    })
}*/