import React from "react";
import axios from "axios";

const { REACT_APP_API_KEY } = process.env;

const CountryDetail = ({ country, weather, weatherHandler }) => {
  !weather &&
    axios
      .get(
        `http://api.weatherstack.com//current?access_key=${REACT_APP_API_KEY}&query=${country.capital}`
      )
      .then((response) => {
        weatherHandler(response.data.current);
      });

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.iso639_2}>{lang.name}</li>
        ))}
      </ul>
      {weather && (
        <>
          <img src={country.flag} alt={`${country.name} flag`} width="100" />
          <h2>Weather in {country.capital}</h2>
          <p>
            <b>temperature: </b>
            {weather.temperature} Celsius
          </p>
          <img src={weather.weather_icons[0]} alt="weather" width="50" />
          <p>
            <b>wind: </b>
            {weather.wind_speed} mph direction {weather.wind_dir}
          </p>
        </>
      )}
    </div>
  );
};

export default CountryDetail;
