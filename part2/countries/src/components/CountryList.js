import React from "react";

const CountryList = ({ countries, filterHandler }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}<button onClick={filterHandler} value={country.name}>show</button></li>
      ))}
    </ul>
  );
};

export default CountryList;
