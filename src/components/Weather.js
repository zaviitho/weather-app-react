import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

const Weather = () => {

    const [weather,setWeather]=useState({})
    const [temperature,setTemperature]=useState(0)
    const [isFahrenheit,setIsFahrenheit]=useState(true)

    const success =position => {
        

        console.log(position.coords)
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=255a2683bd5ad3ec6d689e72383cce35`)
        .then(response => {
            setWeather(response.data)
            const temp=((response.data.main?.temp-273.15)*9/5)+32
            const temp2=temp.toFixed(2)
            setTemperature(temp2)
            console.log('temp: '+temperature )
            console.log(response.data)
        })
    }

   

    const convertTemperature= () =>{
        if(isFahrenheit){
            setTemperature((temperature-32)/1.8000)
            setIsFahrenheit(false)
        }else{
            setTemperature((temperature*1.8000)+32)
            setIsFahrenheit(true)
        }
    }

    useEffect(() =>{
        navigator.geolocation.getCurrentPosition(success)
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    
    return (
        <div className="weather">
            <h1>Weather Day</h1>
            <p>{weather.name}, {weather.sys?.country}</p>
            <div className="weather-wrapper">
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <ul>
                <li>{weather.weather?.[0].description}</li>
                <li><i className="fa-solid fa-wind"></i>Wind speed: {weather.wind?.speed}m/s</li>
                <li><i className="fa-solid fa-cloud"></i>Clouds: {weather.clouds?.all}%</li>
                <li><i className="fa-solid fa-temperature-quarter"></i>Pressure: {weather.main?.pressure}mb</li>
                
            </ul>
            </div>
            <h3>{temperature}{isFahrenheit? '°F' :'°C'}</h3>
            <button onClick={convertTemperature}>Degree °F/°C </button>
        </div>
    );
};

export default Weather;