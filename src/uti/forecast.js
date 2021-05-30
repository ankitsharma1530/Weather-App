const request = require('request')


const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=316d04bfaa90a5ebfbad0de57c5ed19a&query='+ latitude +','+ longitude

    request({url,json:true},(error,{body}) => {
        if(error)
        {
            callback('unable to connect with weather service',undefined)
        }
        else if(body.error)
        {
            callback('unable to find location', undefined)
        }
        else{
            callback(undefined,'it is currently ' + body.current.temperature + ' degree out and feels like ' + body.current.feelslike + ' degree')
            
        }
    })
}
module.exports = forecast