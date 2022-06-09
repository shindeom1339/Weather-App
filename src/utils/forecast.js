const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/5575c8ba7426b8ee259fbefac0417b8a/'+ encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=si'
    request({ url, json: true }, (error, response) => {
        if (error){
            callback('Unable to connect to weather service.', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature + "°C out there. There is a " + response.body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast;