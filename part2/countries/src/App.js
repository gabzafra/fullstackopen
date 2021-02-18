import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredList = countries.filter((country) =>
    country.name.toUpperCase().startsWith(newSearch.trim().toUpperCase())
  );

  const handleWeather = (weather) => {
    setWeather(weather);
  };
  const handleSearchChange = (event) => {
    setWeather(null);
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <Filter filterHandler={handleSearchChange} value={newSearch} />
      {filteredList.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredList.length === 1 ? (
        <CountryDetail
          country={filteredList[0]}
          weather={weather}
          weatherHandler={handleWeather}
        />
      ) : (
        <CountryList
          countries={filteredList}
          filterHandler={handleSearchChange}
        />
      )}
    </div>
  );
};

export default App;
