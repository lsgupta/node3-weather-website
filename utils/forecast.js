const request= require('request')
const forecast=(lat,long,callback)=>{
    url='https://api.darksky.net/forecast/10b40c403362b4f840b9faae514dbd9b/'+lat+','+long+'?units=si'
    request({url:url,json:true},(error,{body})=>{
        if(error)
        callback('unable to connect');
        else if(body.code==400){
            callback('Unable to find location')
        }
        else
        callback(undefined,
           body.daily.data[0].summary + ' Current temp is ' + body.currently.temperature + ', probablity of rain is ' + body.currently.precipProbability+'. Minimum temprature is '+body.daily.data[0].temperatureLow+', Maximum temprature is '+body.daily.data[0].temperatureHigh+'.'
        )
    })
}
module.exports=forecast