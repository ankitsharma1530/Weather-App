const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5raXRtNCIsImEiOiJja292bnkwMm0wYTczMnZyNDFveDFld2hrIn0.SxUousYqdG8iL5YpZbpc2A&limit=1'

    request({url, json:true} , (error,{body}) => {
        if(error)
        {
            callback('unable to connect to location service', undefined)
        }
        else if(body.features.length===0)
        {
            callback('unable to find location', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
        
    })
}

module.exports = geocode