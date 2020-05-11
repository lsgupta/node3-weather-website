const forecast = require('./forecast')
const geocode = require('./geocode')


const check=(address)=>{
geocode(address, (error, { lat, long, location }) => {
    if (error) {
        return({ error:error });
    }
    else {
        forecast(lat, long, (error, data) => {
            if (error) {
                return (error);
            }
            else {
                return ({forecast:data,
                    location,
                    //location:location and location is same thing
                    address:address
                })
            }
        })
    }


})
}
module.exports=check