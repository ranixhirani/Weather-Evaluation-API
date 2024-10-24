const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/weather', async (req, res) => {
    const cities = [
        { name: 'Delhi', lat: 28.6139, lon: 77.2090 },
        { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
        { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
        { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
        { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
        { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 }
    ];

    try {
        // Fetch weather data for all cities concurrently
        const weatherPromises = cities.map(city => weatherController.getWeatherForCity(city));
        const weatherDataArray = await Promise.all(weatherPromises);

        // Filter out null responses (in case some city failed to fetch data)
        const filteredWeatherData = weatherDataArray.filter(data => data !== null);

        res.json(filteredWeatherData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;
