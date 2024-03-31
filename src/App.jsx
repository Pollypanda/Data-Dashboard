import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [temperatureRange, setTemperatureRange] = useState({ min: '', max: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [searchDateError, setSearchDateError] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=Atlanta&key=${API_KEY}`
        );
        const data = await response.json();
        setWeatherData(data);
        setFilteredData(data?.data || []); // Initialize filtered data with all data

        // Extract latitude and longitude from the response
        if (data && data.lat && data.lon) {
          setLatitude(data.lat);
          setLongitude(data.lon);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setErrorMessage('Failed to fetch weather data. Please try again later.');
      }
    };
    fetchWeatherData();
  }, []);

  useEffect(() => {
    // Filter data based on search date
    if (searchDate) {
      const filtered = weatherData?.data.filter((day) => day.valid_date === searchDate);
      setFilteredData(filtered || []);
    } else {
      setFilteredData(weatherData?.data || []);
    }
  }, [searchDate, weatherData]);

  useEffect(() => {
    // Filter data based on temperature range
    if (temperatureRange.min !== '' && temperatureRange.max !== '') {
      const filtered = weatherData?.data.filter((day) => {
        const temp = parseInt(day.temp);
        return temp >= parseInt(temperatureRange.min) && temp <= parseInt(temperatureRange.max);
      });
      setFilteredData(filtered || []);
    }
  }, [temperatureRange, weatherData]);

  // Function to convert temperature from Celsius to Fahrenheit and round to nearest whole number
  const convertToFahrenheit = (celsius) => {
    return Math.round((celsius * 9 / 5) + 32);
  };

  // Calculate summary statistics
  const totalDays = filteredData ? filteredData.length : 0;
  const averageTemperature = filteredData
    ? filteredData.reduce((acc, day) => acc + convertToFahrenheit(parseInt(day.temp)), 0) / totalDays
    : 0;
  const highestTemperature = filteredData
    ? convertToFahrenheit(Math.max(...filteredData.map((day) => parseInt(day.temp))))
    : 0;
  const lowestTemperature = filteredData
    ? convertToFahrenheit(Math.min(...filteredData.map((day) => parseInt(day.temp))))
    : 0;

  // Function to validate search date format
  const isValidDateFormat = (dateString) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    return pattern.test(dateString);
  };

  // Handle search date change
  const handleSearchDateChange = (e) => {
    const value = e.target.value;
    setSearchDate(value);
    if (!isValidDateFormat(value)) {
      setSearchDateError('Please enter a valid date format (YYYY-MM-DD)');
    } else {
      setSearchDateError('');
    }
  };

  return (
    <div className="whole-page">
      <div className="header-feature">
        <div className="header-section">
          <h1>Atlanta, USA</h1>
        </div>
        <div className="header-section">
          {latitude && longitude && (
            <div>
              <h4>Latitude: {latitude}</h4>
              <h4>Longitude: {longitude}</h4>
            </div>
          )}
        </div>
        <div className="header-section">
          <h4>Total Days: {totalDays}</h4>
          <h4>Average Temp: {averageTemperature.toFixed(2)} °F</h4>
          <h4>Highest Temp: {highestTemperature} °F</h4>
          <h4>Lowest Temp: {lowestTemperature} °F</h4>
        </div>
      </div>
      <div>
        <h2></h2>
        <input
          type="text"
          placeholder="Enter Date (YYYY-MM-DD)"
          value={searchDate}
          onChange={handleSearchDateChange}
        />
        {searchDateError && <p className="error-message">{searchDateError}</p>}
      </div>
      <div>
        <h2></h2>
        <input
          type="number"
          placeholder="Min Temperature"
          value={temperatureRange.min}
          onChange={(e) => setTemperatureRange({ ...temperatureRange, min: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Temperature"
          value={temperatureRange.max}
          onChange={(e) => setTemperatureRange({ ...temperatureRange, max: e.target.value })}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {filteredData && filteredData.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Temperature</th>
                <th>Moonrise</th>
                <th>MoonSet</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((day, index) => (
                <tr key={index}>
                  <td>{day.valid_date}</td>
                  <td>{convertToFahrenheit(day.temp)} °F</td>
                  <td>{new Date(day.moonrise_ts * 1000).toLocaleTimeString()}</td>
                  <td>{new Date(day.moonset_ts * 1000).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No matching data found.</p>
      )}
    </div>
  );
}

export default App;
