//controllers/weahterController.js

const Weather = require('../models/weatherModel');
const apiKey = 'e02140e9bc04cc180817a6c8bfc229ee'; 
const axios = require('axios');

const getWeatherForCity = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error(`Received error from API: ${response.statusText}`);
        }

        const dailyData = {};
        response.data.list.forEach((entry) => {
            const date = new Date(entry.dt * 1000).toISOString().split('T')[0];
            if (!dailyData[date]) {
                dailyData[date] = {
                    totalTemperature: 0,
                    maxTemperature: -Infinity,
                    minTemperature: Infinity,
                    weatherConditions: {},
                    count: 0
                };
            }

            dailyData[date].totalTemperature += entry.main.temp;
            dailyData[date].maxTemperature = Math.max(dailyData[date].maxTemperature, entry.main.temp);
            dailyData[date].minTemperature = Math.min(dailyData[date].minTemperature, entry.main.temp);
            const condition = entry.weather[0].description;
            dailyData[date].weatherConditions[condition] = (dailyData[date].weatherConditions[condition] || 0) + 1;
            dailyData[date].count += 1;
        });

        for (const date in dailyData) {
            const daily = dailyData[date];
            const averageTemperature = daily.totalTemperature / daily.count;

            const dominantCondition = Object.keys(daily.weatherConditions).reduce((a, b) => 
                daily.weatherConditions[a] > daily.weatherConditions[b] ? a : b
            );

            const existingEntry = await Weather.findOne({ city: city.name, date: new Date(date) });
            if (!existingEntry) {
                const weatherEntry = new Weather({
                    city: city.name,
                    date: new Date(date),
                    averageTemperature: averageTemperature,
                    maxTemperature: daily.maxTemperature,
                    minTemperature: daily.minTemperature,
                    dominantCondition: dominantCondition,
                });

                console.log('Saving to MongoDB:', weatherEntry);
                await weatherEntry.save();
            }
        }
    } catch (error) {
        console.error(`Error fetching weather data for ${city.name}:`, error.message);
    }
    return { city: city.name, data: dailyData };
};
