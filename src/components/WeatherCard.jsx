import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header'
import Footer from './Footer';

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`lat=${latitude}&lon=${longitude}`);
      });
    }
  }, []);

  useEffect(() => {
    if (location) {
      const apiKey = 'dec7dba29479ec21c563c26c214b007b';
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${apiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${location}&appid=${apiKey}`;
      const additionalLocations = [
        { name: 'Paris', coords: 'lat=48.8566&lon=2.3522' },
        { name: 'London', coords: 'lat=51.5074&lon=-0.1278' },
        { name: 'Milan', coords: 'lat=45.4642&lon=9.1900' },
        { name: 'Lagos', coords: 'lat=6.5833&lon=3.3958' },
        { name: 'Monaco', coords: 'lat=43.7333&lon=-7.4167' },
        { name: 'Silverstone', coords: 'lat=52.0922&lon=1.026' },
      ];

      const additionalLocationRequests = additionalLocations.map((location) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?${location.coords}&appid=${apiKey}`
        )
      );

      axios
        .all([axios.get(currentWeatherUrl), axios.get(forecastUrl), ...additionalLocationRequests])
        .then(
          axios.spread((currentResponse, forecastResponse, ...additionalResponses) => {
            const currentWeather = currentResponse.data;
            const forecastWeather = forecastResponse.data;
            const additionalWeatherData = additionalResponses.map((response) => response.data);
            setWeatherData({ current: currentWeather, forecast: forecastWeather, additional: additionalWeatherData });
          })
        )
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [location]);

  return (
    <div className="h-[1061px] bg-cover bg-center relative"
    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1499037185672-7e3a02f319b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU5fHxza3l8ZW58MHwwfDB8fHwy&auto=format&fit=crop&w=500&q=60')` }}
 >
    <Header />
    
    <div className="container mx-auto p-4 pt-16">
      {weatherData && (
        <div>
          <div className="bg-opacity-20 backdrop-blur-md bg-blue-500 w-1/3 p-4 mx-auto rounded-lg shadow-md text-center flex justify-between">
            <div>
              <h3 className='text-white font-bold text-2xl'>{weatherData.current.name}</h3>
              <p className='text-white font-bold text-2xl'>{weatherData.current.weather[0].description}</p>
            </div>
            <div>
              <p className='text-white font-bold text-4xl'>{Math.round(weatherData.current.main.temp - 273.15)}°C</p>
            </div>
          </div>

          <h2 className="text-2xl text-center text-white p-4 font-bold">{weatherData.current.name}  2-day Forecast</h2>
          <div className="grid grid-cols-2 gap-4">
            {weatherData.forecast.list
              .filter((data) => data.dt_txt.includes('15:00:00'))
              .slice(0, 2)
              .map((data, index) => (
                <div key={index} className=" bg-opacity-20 backdrop-blur-md bg-blue-500  p-4 rounded-lg shadow-md text-center">
                  <h3 className='text-white font-bold text-xl'>{new Date(data.dt * 1000).toLocaleDateString()}</h3>
                  <p className='text-white font-bold text-3xl'>{Math.round(data.main.temp - 273.15)}°C</p>
                  <p className='text-white font-bold text-xl'>{data.weather[0].description}</p>
                </div>
              ))}
          </div>

          <h2 className="text-2xl text-center pb-[35px] text-white p-4 font-bold mt-4">Additional Locations</h2>
          <div className="grid grid-cols-3 gap-4">
            {weatherData.additional.map((data, index) => (
              <div key={index} className=" bg-opacity-20 backdrop-blur-md bg-blue-500  p-4  rounded-lg shadow-md text-center">
                <h3 className='text-white font-bold text-xl'>{data.name}</h3>
                <p className='text-white font-bold text-3xl'>{Math.round(data.main.temp - 273.15)}°C</p>
                <p className='text-white font-bold text-xl'>{data.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    <Footer />

    </div>
  );
}

export default WeatherApp;
