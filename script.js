// --- Configuration ---
// Sign up at https://openweathermap.org to get a free API key
const API_KEY = 'f2281fc416e7439261e79fa671cd3ae4'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

// DOM Elements
const appBody = document.getElementById('appBody')
const weatherForm = document.getElementById('weatherForm')
const cityInput = document.getElementById('cityInput')
const suggestionBtns = document.querySelectorAll('.suggestion-btn')
const errorMessage = document.getElementById('Error')

const card = document.getElementById('card')
const cityName = document.getElementById('cityName')
const cityTemp = document.getElementById('temperature')
const weatherDesc = document.getElementById('weatherDesc')
const cityHumidity = document.getElementById('humidity')
const cityWindSpeed = document.getElementById('windSpeed')
const weatherIcon = document.getElementById('weatherIcon')
const feelsLikeElement = document.getElementById('feelsLike')
const sunriseElement = document.getElementById('sunrise')

// Event Listener
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const city = cityInput.value.trim()
  if (city) {
    getWeatherInfo(city)
  }
})

// Get Weather Information
async function getWeatherInfo(city) {
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

// Map weather conditions to Background gradients
function updateBackground(weatherCondition) {
  const baseClasses =
    'text-gray-800 font-sans antialiased min-h-screen selection:bg-pink-500 selection:text-white'
  let gradientClasses = ''

  switch (weatherCondition) {
    case 'Clear':
      gradientClasses =
        'bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600'
      break
    case 'Clouds':
      gradientClasses =
        'bg-gradient-to-br from-gray-300 via-slate-400 to-gray-500'
      break
    case 'Rain':
    case 'Drizzle':
      gradientClasses =
        'bg-gradient-to-br from-slate-700 via-slate-800 to-gray-900'
      break
    case 'Thunderstorm':
      gradientClasses =
        'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
      break
    case 'Snow':
      gradientClasses =
        'bg-gradient-to-br from-blue-100 via-blue-200 to-white text-gray-900'
      break
    case 'Mist':
    case 'Fog':
    case 'Haze':
      gradientClasses =
        'bg-gradient-to-br from-gray-300 via-stone-400 to-gray-400'
      break
    default:
      gradientClasses =
        'bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600'
  }

  appBody.className = `${baseClasses} ${gradientClasses}`
}

suggestionBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Trim it right away!
    const city = btn.textContent.trim()

    cityInput.value = city
    getWeatherInfo(city)
  })
})

function displayWeatherInfo(data) {
  errorMessage.classList.add('hidden')
  card.classList.remove('hidden')

  // Existing text updates
  cityName.textContent = data.name
  cityTemp.textContent = Math.floor(data.main.temp)
  weatherDesc.textContent = data.weather[0].description
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  cityHumidity.textContent = `${data.main.humidity}%`
  cityWindSpeed.textContent = `${data.wind.speed} km/h`

  // NEW: Feels Like
  feelsLikeElement.textContent = `${Math.floor(data.main.feels_like)}°C`

  // NEW: Convert integer timestamp to readable 12-hour AM/PM string
  const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  sunriseElement.textContent = sunriseTime

  // Trigger background update based on the main weather condition
  const mainCondition = data.weather[0].main
  updateBackground(mainCondition)
}
function showError() {
  card.classList.add('hidden')
  errorMessage.classList.remove('hidden')
}
