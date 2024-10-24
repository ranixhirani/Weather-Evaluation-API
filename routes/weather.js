//routes/weather.js
const express = require('express');
const router = express.Router();
const Weather = require('../models/weatherModel');


router.get('/getWeather', async (req, res) => {
    try {
        
        const weatherData = await Weather.find(); 
        res.json(weatherData); 
    } catch (error) {
        console.error('Error fetching weather data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;
