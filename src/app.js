const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./uti/geocode')
const forecast = require('./uti/forecast')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlerbars engine and views loaction
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather',
        name:'Ankit sharma'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : 'about me',
        name: 'ankit sharma'
    })
})
app.get('/help', (req,res) => {
    res.render('help',{
        helptext: ' this is some helpful text',
        title:'help',
        name:'ankit'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address)
    {
        return res.send({
            error:'You must provide address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) =>{
        if(error)
        {
            return res.send({error})
        }

        forecast(latitude,longitude,(error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast:'it is snow',
    //     location: 'India',
    //     address:req.query.address
    // })
})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        titile: '404',
        name: 'ankit sharma',
        errorMessage:' Help article not found'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title:'404',
        name: 'ankit sharma',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () =>{
    console.log('server is up on 3000')
})
