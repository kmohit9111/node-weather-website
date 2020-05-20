const request = require('request')

const forecast = (location,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?q='+ encodeURIComponent(location) + '&appid=29366f57b2b3a3785abe43880f2fbebb&units=metric'

    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather services!',undefined)
        }
        else if(response.body.message){
            callback('Unable to locate the location!')
        }
        else{
            
            callback(undefined,'Location:'+response.body.name +','+response.body.sys.country+'\n' +'. Description:'+ response.body.weather[0].description+'.'+' It is currently '+ response.body.main.temp + ' degrees and cloud percentage is '+ response.body.clouds.all)
        }
    })
}

module.exports=forecast