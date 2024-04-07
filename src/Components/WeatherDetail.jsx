import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

// Function to map moon phase value to symbol and description
const getMoonPhase = (phaseValue) => {
    // Map moon phase values to their corresponding symbols and descriptions
    const phaseMap = {
      'New Moon': '🌑 New Moon',
      'Waxing Crescent': '🌒 Waxing Crescent',
      'First Quarter': '🌓 First Quarter',
      'Waxing Gibbous': '🌔 Waxing Gibbous',
      'Full Moon': '🌕 Full Moon',
      'Waning Gibbous': '🌖 Waning Gibbous',
      'Last Quarter': '🌗 Last Quarter',
      'Waning Crescent': '🌘 Waning Crescent',
    };
  
    // Determine the moon phase based on the phase value
    if (phaseValue <= 0.125) {
      return phaseMap['New Moon'];
    } else if (phaseValue <= 0.25) {
      return phaseMap['Waxing Crescent'];
    } else if (phaseValue <= 0.375) {
      return phaseMap['First Quarter'];
    } else if (phaseValue <= 0.5) {
      return phaseMap['Waxing Gibbous'];
    } else if (phaseValue <= 0.625) {
      return phaseMap['Full Moon'];
    } else if (phaseValue <= 0.75) {
      return phaseMap['Waning Gibbous'];
    } else if (phaseValue <= 0.875) {
      return phaseMap['Last Quarter'];
    } else {
      return phaseMap['Waning Crescent'];
    }
  };


const WeatherDetail = () => {
  const { date } = useParams();
  const [weatherDetail, setWeatherDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherDetail = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=Atlanta&start_date=${date}&end_date=${date}&key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather detail');
        }
        const data = await response.json();
        console.log('Weather detail data:', data);
        setWeatherDetail(data);
      } catch (error) {
        console.error('Error fetching weather detail:', error);
        setError('Failed to fetch weather detail. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherDetail();
  }, [date]); // Fetch weather details whenever the date changes

  console.log('Date:', date);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherDetail || !weatherDetail.data || weatherDetail.data.length === 0) {
    return <div>No weather detail available for this date.</div>;
  }

  // Find the data corresponding to the selected date
  const selectedDateData = weatherDetail.data.find(day => day.valid_date === date);

  if (!selectedDateData) {
    return <div>No weather detail available for this date.</div>;
  }
// Get moon phase symbol and description
const moonPhase = getMoonPhase(selectedDateData.moon_phase);

  return (
    <div className="weather-detail">
      <h2>Weather Details</h2>
      <div>
        <h2>Date: {date}</h2>
        <p>Phase: {moonPhase}</p>
        <p>Visibility: {(selectedDateData.moon_phase * 100).toFixed(2)}%</p>
        <p>Moonrise: {new Date(selectedDateData.moonrise_ts * 1000).toLocaleTimeString()}</p>
        <p>Moonset: {new Date(selectedDateData.moonset_ts * 1000).toLocaleTimeString()}</p>
        <p>UV: {selectedDateData.uv}</p>
        <p>Description: {selectedDateData.weather.description}</p>
      </div>
      <div>
      <Link to="/" className="go-back-button">Go Back</Link>
      </div>

    </div>
    
    
  );
};

export default WeatherDetail;
