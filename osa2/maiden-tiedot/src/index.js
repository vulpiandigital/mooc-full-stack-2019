import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import AppStyle from './App.css'

let delaySearch

const Weather = ({ capital, country }) => {
	const apiURL = 'http://api.weatherstack.com/current'
	const apiKey = 'e7d0df9c5e86101253865615f9584f86'
	const apiQuery = capital+', '+country+'&units=m'
	
	const [weatherData, setWeatherData] = useState(null)
	
	useEffect(() => {
		axios
		.get(`${apiURL}?access_key=${apiKey}&query=${apiQuery}`)
		.then(response => {
			if ( typeof(response.data.error) !== 'undefined') {
				alert(`Weather query failure: ${response.data.error.info}`)
			} else {
				setWeatherData(response.data.current)
			}
		}).catch((error) => {
			alert(error)
		})
	}, [apiQuery])
	if ( weatherData !== null )  {
		return (
			<>
				<h3>Weather in {capital}</h3>
				<p>Temperature: {weatherData.temperature} Celsius</p>
				<img src={weatherData.weather_icons[0]} alt={weatherData.weather_descriptions[0]} />
				<p>Wind: {weatherData.wind_speed} kph, direction {weatherData.wind_dir}</p>
			</>
		)
	} else {
		return (
			<>
			</>
		)
	}
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [country, setCountry] = useState('')
	const [results, setResults] = useState([])
	const getCountry = (e) => {
		setCountry(e.target.value)
		let searchstr = e.target.value
		clearTimeout(delaySearch)
		delaySearch = setTimeout(() => { 
			let matches = []
			if ( searchstr.length > 0) {
				let broadExp = new RegExp(searchstr,'i'), narrowExp = new RegExp('^'+searchstr+'$','i')
				countries.forEach(country => {
					if ( country.name.search(broadExp) >= 0 ) {
						matches.push(country)
					}
				})
				if ( matches.length > 1 ) {
					let singleMatch = []
					for ( let i = 0; i < matches.length; i++ ) {
						if ( matches[i].name.search(narrowExp) >= 0 ) {
							singleMatch.push(matches[i])
							break
						}
					}
					if ( singleMatch.length > 0 ) {
						matches = singleMatch
					}
				}
			}
			setResults(matches)
		}, 1000/60)
	}	
	useEffect(() => {
		axios
		.get('https://restcountries.eu/rest/v2/all')
		.then(response => {
			setCountries(response.data)
		})
	}, [])
	return (
		<div>
			<h1>Country info</h1>
			<p>Find countries <input onChange={getCountry} value={country} /></p>
			{ results.length > 10 &&
			<p>Too many matches, please try a more specific search.</p>
			}
			{ results.length <= 10 && results.length > 1 && 
			<ul className="results">
				{ results.map(country => 
					<li key={country.alpha2Code}>{country.name} <button onClick={getCountry}value={country.name}>Show</button></li>
				)}
			</ul>
			}
			{ results.length === 1 &&
			<>
				<h2>{results[0].name}</h2>
				<p>Capital: {results[0].capital}<br/>
				Population: {results[0].population}</p>
				<h3>Languages</h3>
				<ul>
					{ results[0].languages.map(language => <li key={language.name}>{language.name}</li>) }
				</ul>
				<img src={results[0].flag} alt={results[0].name} width="150" />
				<Weather capital={results[0].capital} country={results[0].name} />				
			</>
			}
			{ results.length === 0 &&
			<p></p>
			}
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));