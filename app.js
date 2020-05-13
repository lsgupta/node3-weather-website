const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const check=require('./utils/check')

const app = express()
console.log(__dirname)
const publicPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')
const port=process.env.PORT||3000

//express looks default for hbs in folder name 'views'
//app.set('views',pathName)
//here path name is simailar like public_path has the value of absolute path of any other
//..folder name apart from views..
//to set a different path name below is the syntax
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))//this is use to get static html files to node js
//app.get(''),(req,res)=>{
//    res.send('main page');}    actuall synatx..
//above one is using a static path from index.html

// app.get('',(req,res)=>{
//     res.render('index',{  index is file name 
//     title:'weather'   here are the values passinng into hbs file
//     })
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Love'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Love'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Love',
        help: 'You are on help page'
    })
})
app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            Error: 'Please enter search term'
        });

    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            Error: 'Please enter valid address'
        })
    }
 
   geocode(req.query.address, (error, { lat, long, location }={}) => {
    if (error) {
       
        return res.send({ error });
        
    }
    else {
        forecast(lat, long, (error, data) => {
            if (error) {
                
                return res.send(error);
            }
            else {
                res.send({forecast:data,
                    location,
                    //location:location and location is same thing
                    address:req.query.address
                })
            }
        })
    }


})


})
app.get('/help/*', (req, res) => {
    res.render('Error', {
        data: 'Help article not found',
        name: 'Love',
        title: 'Error'
    })
})
app.get('*', (req, res) => {
    res.render('Error', {
        data: 'Page not found',
        name: 'Love',
        title: 'Error'
    })
})
app.listen(port, () => {
    console.log('server is running on'+port);
})