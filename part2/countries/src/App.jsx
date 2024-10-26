import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const FilterCountries = (props) => {
  return(
    <form>
      <h2>Country finder</h2>
      <div>
        find countries: <input value={props.value} onChange={props.onChange}></input>
      </div>
    </form>
  )
}

const ShowWeather = ({weather}) => {
  const weatherStyle = {
    backgroundColor: 'lightblue',
    borderRadius: 8,
    width: 300,
    padding: 5,
  }
  if (!weather) return null
  return (
    <div style={weatherStyle}>
      <p></p>
      <h3>Weather in {weather.name}</h3>
      <p>Temperature: {weather.temp_c}°C</p>
      <img src={weather.icon} alt="weather icon"></img>
      <p>Wind {weather.wind_kph} km/h</p>
    </div>
  )
}

const ShowCountry = ({selectedCountry}) => {
  if (!selectedCountry) return null
  return(
    <div>
      <h2>{selectedCountry.name.common}</h2>
      <p>Capital: {selectedCountry.capital[0]}</p>
      <p>Area: {selectedCountry.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(selectedCountry.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={selectedCountry.flags.png}></img>
      <ShowWeather capital={selectedCountry.capital[0]}/>
    </div>
    
  )
}

const ShowCountries = ({foundCountries, onSelectedCountry}) => {
  return(
    foundCountries.length === 0 ? null
    : foundCountries.length > 10 ? <p>Too many matches, specify another filter</p>
    : foundCountries.length <= 1 ? null
    : foundCountries.map(countries => 
      <div key={countries.ccn3}>
        <p>{countries.name.common}<button onClick={() => onSelectedCountry(countries)}>show</button></p>
        
      </div>
    )
  )
}

const App = () => {
  const [countryFilter, setCountryFilter] = useState('')
  const [foundCountries, setFoundCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if(selectedCountry) {countriesService
      .getWeather(selectedCountry.capital[0])
      .then(response => {
        const { current: { condition: { icon }, temp_c, wind_kph }, location: { name } } = response;
        setWeather({ icon, temp_c, wind_kph, name });
      })
      .catch(error => {
        console.log(error);
      })
  }}, [selectedCountry])

  const handleCountryChange = (event) => {
    const updateFilter = event.target.value
    if (updateFilter !== '') {
      setCountryFilter(updateFilter)
      const re = new RegExp([updateFilter.toLowerCase()], 'i')
      countriesService
        .showAll()
        .then(countries => {
          const foundCountriesCopy = countries.filter((country) => country.name.common.search(re) != -1)
          setFoundCountries([...foundCountriesCopy])
          foundCountriesCopy.length === 1 ? setSelectedCountry(foundCountriesCopy[0])
          : setSelectedCountry(null),setWeather(null)
        })
        .catch(error => null)
    } else {
      setCountryFilter('')
      setFoundCountries([])
    }
  }

  return (
    <div>
      <FilterCountries value={countryFilter} onChange={handleCountryChange}/>
      <ShowCountries foundCountries={foundCountries} onSelectedCountry={setSelectedCountry}/>
      <ShowCountry selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>
      <ShowWeather weather={weather} />
    </div>
  )
}

export default App
