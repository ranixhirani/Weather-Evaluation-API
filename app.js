const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const weatherRoutes = require('./routes/weatherRoutes'); // Import the routes
const cron = require('node-cron');

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 8003;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/weatherDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schedule to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
    console.log('Fetching weather data...');
    // Call the weather route to fetch data
    weatherRoutes.handleGetWeather();
});
app.get('/', (req, res) => {
   res.send('<h1>Welcome to the Weather App</h1><p><a href="/weather">Fetch Weather Data</a></p>');
});

// Use the weather routes
app.use('/', weatherRoutes);

// Start the server
app.listen(PORT, () => console.log(`Our server is running at port ${PORT}`));

