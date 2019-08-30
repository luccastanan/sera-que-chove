import RNFetchBlob from 'rn-fetch-blob'

import { WEATHER_URL, WEATHER_KEY, FORECAST_URL, FIND_PLACES_URL, GOOGLE_KEY, PHOTO_URL } from '../constants'
import { kToC } from '../util';

export default Services = {
    forecast: (lat, long, days) => {
        if (days <= 0) {
            return fetch(`${WEATHER_URL}?lat=${lat}&lon=${long}&appid=${WEATHER_KEY}`)
                .then(async resp => {
                    if (!resp.ok)
                        throw new Error('Problema ao carregar previsão do tempo')
                    body = await resp.json()
                    return {
                        current: kToC(body.main.temp),
                        max: kToC(body.main.temp_max),
                        min: kToC(body.main.temp_min),
                        city: body.name
                    }
                })
        } else if (days <= 5) {
            return fetch(`${FORECAST_URL}?lat=${lat}&lon=${long}&appid=${WEATHER_KEY}`)
                .then(async resp => {
                    if (!resp.ok)
                        throw new Error('Problema ao carregar previsão do tempo')

                    let body = await resp.json()
                    let prevList = body.list
                    let min = 0, max = 0, count = 0
                    let prevs = []
                    prevList.forEach(e => {
                        let p = kToC(e.main.temp)
                        if (count == 0)
                            min = max = p

                        if (p < min)
                            min = p
                        else if (p > max)
                            max = p

                        count++

                        if (count > 7) {
                            count = 0
                            prevs.push({
                                min,
                                max
                            })
                        }
                    });
                    return prevs[days - 1]
                })
        }
    },
    restaurants: (place) => fetch(`${FIND_PLACES_URL}&location=${place.latitude},${place.longitude}&key=${GOOGLE_KEY}`)
        .then(async resp => {
            if (!resp.ok)
                throw new Error('Problema ao obter restaurantes próximo desse local')
            let body = await resp.json()
            for (k in body.results) {
                let rest = body.results[k]
                let r = Math.round(rest.rating * 10) / 10

                let photo = rest.photos ? (rest.photos.length > 0 ? rest.photos[0].photo_reference : null) : null

                place.restaurants.push({
                    title: rest.name,
                    rating: Number.isNaN(r) ? 0 : r,
                    address: rest.vicinity,
                    image: photo
                })
            }
            return place
        }),
    downloadPhoto: async (restaurant) =>
        await RNFetchBlob.config({
            fileCache: true,
            appendExt: 'jpg'
        })
            .fetch('GET', `${PHOTO_URL}&photoreference=${restaurant.image}&key=${GOOGLE_KEY}`, {})
            .then((res) => {
                // the temp file path
                let path = res.path()
                let name = path.substring(path.lastIndexOf('/') + 1)
                restaurant.image = name
            }),
    readPhoto: (name) => {
        //return RNFetchBlob.fs.readStream(RNFetchBlob.fs.dirs.DocumentDir + '/' + name, 'base64', 4095)
        return RNFetchBlob.fs.readFile(RNFetchBlob.fs.dirs.DocumentDir + '/' + name, 'base64')
    }
}