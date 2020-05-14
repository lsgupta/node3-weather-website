const request = require('request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWVsb3ZlIiwiYSI6ImNrOGo4ZW95azAwd2gzbXFiaXd4MWd5dTMifQ.onqbV7T5x2bwAKp6voPjHQ'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect please check your internet');
        }
        else if (response.body.features[0] == null) {
            callback('Please enter valid address');
        }
        
        else {
            callback(
                undefined, {
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                location: response.body.features[0].place_name+'.'
            }
            )
        }
    }

    )

}

module.exports=geocode