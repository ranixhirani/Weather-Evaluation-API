# Weather-Evaluation-API
Objective
Develop a real-time data processing system that continuously retrieves and summarizes weather data for the following cities in India:

Delhi
Mumbai
Chennai
Bangalore
Kolkata
Hyderabad
The system focuses on main weather conditions, current temperature, perceived temperature, and time of data updates.

Data Source
The system utilizes the OpenWeatherMap API, which provides various weather parameters. To access the data, you will need to sign up for a free API key.

The relevant weather parameters are:

main: Main weather condition (e.g., Rain, Snow, Clear)
temp: Current temperature in Celsius
feels_like: Perceived temperature in Celsius
dt: Time of the data update (Unix timestamp)
Features
Continuous data retrieval from the OpenWeatherMap API at configurable intervals (e.g., every 5 minutes).
Conversion of temperature values from Kelvin to Celsius.
Daily weather summaries that include:
Average temperature
Maximum temperature
Minimum temperature
Dominant weather condition (with reasoning)
Storage of daily summaries in a MongoDB database for further analysis.
Technology Stack
Frontend: HTML
Backend: Express.js
Database: MongoDB
API: OpenWeatherMap API
Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd <project-directory>
Install the required dependencies:

bash
Copy code
npm install
Set up your MongoDB database. Ensure MongoDB is running on your local machine or use a cloud-based service.

Obtain your OpenWeatherMap API key from OpenWeatherMap.

Create a .env file in the root directory and add your API key and MongoDB connection string:

plaintext
Copy code
API_KEY=your_openweathermap_api_key
MONGODB_URI=your_mongodb_connection_string
Usage
Start the server:

bash
Copy code
npm start
The system will begin retrieving weather data and summarizing it. You can access the summarized data stored in the MongoDB database.

Configuration
The interval for API calls can be configured in the code. By default, it is set to retrieve data every 5 minutes. You can adjust this value as needed.
Database
The daily weather summaries are stored in a MongoDB collection, where each document contains the date, average temperature, maximum temperature, minimum temperature, and dominant weather condition.
License
This project is licensed under the MIT License - see the LICENSE file for details.
