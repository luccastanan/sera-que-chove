import {WEATHER_URL, WEATHER_KEY, FORECAST_URL, FIND_PLACES_URL, GOOGLE_KEY} from '../Constants'
import Util from '../Utilities';

export default Services = {
    forecast: (lat, long, days) => {
        if (days <= 0) {
            return fetch(`${WEATHER_URL}?lat=${lat}&lon=${long}&appid=${WEATHER_KEY}`)
                .then(async resp => {
                    if (!resp.ok)
                        throw new Error('Problema ao carregar previsão do tempo')
                    body = await resp.json()
                    return {
                        current: Util.kToC(body.main.temp),
                        max: Util.kToC(body.main.temp_max),
                        min: Util.kToC(body.main.temp_min)
                    }
                })
        }else if(days <= 5) {
            return fetch(`${FORECAST_URL}?lat=${lat}&lon=${long}&appid=${WEATHER_KEY}`)
                .then(async resp => {
                    if (!resp.ok)
                        throw new Error('Problema ao carregar previsão do tempo')

                    let body = await resp.json()
                    let prevList = body.list
                    let min = 0, max = 0, count = 0
                    let prevs = []
                    prevList.forEach(e => {
                        let p = Util.kToC(e.main.temp)
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
                    return prevs[days-1]
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
                place.restaurants.push({
                    title: rest.name,
                    rating: Number.isNaN(r) ? 0 : r,
                    address: rest.vicinity,
                })
            }
            return place
        })
}