import React from "react";

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.iso639_2}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`${country.name} flag`} width="100" />
    </div>
  );
};
export default CountryDetail;
