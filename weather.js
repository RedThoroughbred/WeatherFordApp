function getWeather() {
    const apiKey = '2793290d504358acd13efc9ef9a8ae52';
    const zipCode = document.getElementById('zip').value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherInfoDiv = document.getElementById('weather-info');
            weatherInfoDiv.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
        });
}

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = '';

    // Check if the API response contains the 'weather' and 'main' properties
    if (!data.weather || !data.weather[0] || !data.main) {
        weatherInfoDiv.innerHTML = '<p>Weather data not available</p>';
        return;
    }

    const cityName = data.name;
    const description = data.weather[0].description;
    const temperatureCelsius = data.main.temp;
    const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
    const humidity = data.main.humidity;

    const weatherData = `
        <p>City: ${cityName}</p>
        <p>Description: ${description}</p>
        <p>Temperature: ${temperatureFahrenheit} &#8457;</p>
        <p>Humidity: ${humidity}%</p>
    `;

    weatherInfoDiv.innerHTML = weatherData;

    // Trigger the animation by adding the 'show' class after a short delay
    setTimeout(() => {
        weatherInfoDiv.classList.add('show');
    }, 100);
}
