// --- Configuration ---
// Sign up at https://openweathermap.org to get a free API key
const API_KEY = 'f2281fc416e7439261e79fa671cd3ae4'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

//DOM Elements
const weatherForm = document.getElementById('weatherForm')
const cityInput = document.getElementById('cityInput')
const errorMessage = document.getElementById('Error')

const card = document.getElementById('card')
const cityName = document.getElementById('cityName')
const cityTemp = document.getElementById('temperature')
const weatherDesc = document.getElementById('weatherDesc')
const cityHumidity = document.getElementById('humidity')
const cityWindSpeed = document.getElementById('windSpeed')
const weatherIcon = document.getElementById('weatherIcon')

//Event Listener
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const city = cityInput.value
  if (city) {
    getWeatherInfo(city)
  }
})

//Get Weather Information
async function getWeatherInfo(city) {
  // Implementation for fetching weather data
  try {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('City not found')
    }

    const data = await response.json()
    displayWeatherInfo(data)
  } catch (error) {
    showError()
  }
}

function displayWeatherInfo(data) {
  errorMessage.classList.add('hidden')

  card.classList.remove('hidden')

  cityName.textContent = data.name
  cityTemp.textContent = Math.floor(data.main.temp)
  weatherDesc.textContent = data.weather[0].description
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  cityHumidity.textContent = `${data.main.humidity}%`
  cityWindSpeed.textContent = `${data.wind.speed} km/h`
}

function showError() {
  card.classList.add('hidden')
  errorMessage.classList.remove('hidden')
}
