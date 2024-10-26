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

const ShowCountries = ({foundCountries}) => {
  return(
    foundCountries.length === 0 ? null
    : foundCountries.length > 10 ? <p>Too many matches, specify another filter</p>
    : foundCountries.length > 1 ? foundCountries.map(countries => <p key={countries.ccn3}>{countries.name.common}</p>)
    : <>
      <h2>{foundCountries[0].name.common}</h2>
      <p>Capital: {foundCountries[0].capital[0]}</p>
      <p>Area: {foundCountries[0].area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(foundCountries[0].languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={foundCountries[0].flags.png}></img>
    </>
  )
}

const App = () => {
  const [countryFilter, setCountryFilter] = useState('')
  const [foundCountries, setFoundCountries] = useState([])

  const handleCountryChange = (event) => {
    const updateFilter = event.target.value
    if (updateFilter !== '') {
      setCountryFilter(updateFilter)
      const re = new RegExp('^' + updateFilter.toLowerCase(), 'i')
      countriesService
        .showAll()
        .then(countries => {
          const foundCountriesCopy = countries.filter((country) => country.name.common.search(re) != -1)
          setFoundCountries([...foundCountriesCopy])
        })
        .catch(error => null)
    } else {
      setCountryFilter('')
      setFoundCountries([])
    }
  }

  return (
    <div>
      <FilterCountries value={countryFilter} onChange={handleCountryChange} />
      <ShowCountries foundCountries={foundCountries} />
    </div>
  )
}

export default App
