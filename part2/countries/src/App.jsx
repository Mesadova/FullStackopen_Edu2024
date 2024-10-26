import { useState } from 'react'
import countriesService from './services/countries'

const FilterCountries = (props) => {
  return(
    <form>
      <p></p>
      <div>
        find countries: <input value={props.value} onChange={props.onChange}></input>
      </div>
    </form>
  )
}

const ShowCountry = ({selectedCountry}) => {
  if (!selectedCountry) return null
  return(
    <div>
      <h2>{selectedCountry.name.common}</h2>
      <p>Capital: {selectedCountry.capital[0]}</p>
      <p>Area: {selectedCountry.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(selectedCountry.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={selectedCountry.flags.png}></img>
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
        <p>{countries.name.common}</p>
        <button onClick={() => onSelectedCountry(countries)}>show</button>
      </div>
    )
  )
}

const App = () => {
  const [countryFilter, setCountryFilter] = useState('')
  const [foundCountries, setFoundCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

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
          console.log(foundCountriesCopy)
          foundCountriesCopy.length === 1 ? setSelectedCountry(foundCountriesCopy[0])
          : setSelectedCountry(null)
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
    </div>
  )
}

export default App
