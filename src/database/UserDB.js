import Db from './RealmSchemas'

export default UserDB = {
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
    select: (id) => {
        let res = Db.objects('User').filtered('id = $0', id)
        return Object.keys(res).length !== 0 ? res[0] : null
    },
    auth: (email, pass) => {
        let res = Db.objects('User').filtered('email = "' + email + '" AND pass = "' + pass + '"')
        return Object.keys(res).length !== 0 ? res[0] : null
    }, 
    update: (user) => {
        Db.write(() => {
            let uUser = Db.objectForPrimaryKey('User', user.id)
            uUser.name = user.name
            uUser.email = user.email
            uUser.pass = user.pass
            uUser.dateBirth = user.dateBirth
            uUser.phone = user.phone
        })
    },
    insertCache: (cUser) => {
        let res = Db.objects('CacheUser')
        Db.write(() => {
            if (Object.keys(res).length === 0)
                Db.create('CacheUser', {idUser: cUser.id})
            else 
                res[0].idUser = cUser.id
        })
    },
    selectCache: (withListener) => {
        let userCache = Db.objects('CacheUser')
        if(userCache.length > 0){
            let userId = userCache[0].idUser
            let users = Db.objects('User').filtered('id = $0', userId)
            return withListener ? users : users[0]
        }
        return null
    }  
}