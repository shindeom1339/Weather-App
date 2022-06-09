const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index.hbs', {
        title: 'Weather App',
        name: 'Om Shinde'
    })
})

// Wiring /weather
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.get('/weather', (req, res) =>{
    if (!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    geoCode(`${req.query.address}`, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})                 
            }
            res.send({
                Location: location,
                Forecast: forecastData
            })
        })
    })
})


app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found.',
        name: 'Om Shinde'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Om Shinde'
    })
})

app.listen(5000, () => {
    console.log('Server is up on port 5000');
})