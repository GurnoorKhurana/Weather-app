document.getElementById('search-button').addEventListener('click', handleWeatherSearch);
document.getElementById('city-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleWeatherSearch();
    }
});

function handleWeatherSearch() {
    const city = document.getElementById('city-input').value;
    getWeather(city);
}

async function getWeather(city) {
    const apiKey = 'cab03220c0c4431af9479f478dc699cc';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
       const response = await fetch (url);
       if (!response.ok){
        throw new Error('City not found');
       }
       const data = await response.json();
       displayWeather(data);
       getWeatherImage(data.weather[0].description);
    } catch (error){
        displayError(error.message);
    }
}
function displayError(message) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `<p>${message}</p>`;
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
        <h3>${data.name}</h3>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
async function getWeatherImage(description) {
    const unsplashApiKey = '-oOF8-RWrCHACiUrPFBXgsBwqy2vGhXO7bOYw3e25QI'; // Your Unsplash API key
    const query = description.replace(/ /g, '-'); // Format the description for the search query
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashApiKey}`;

    try {
        const response = await fetch(unsplashUrl);
        const data = await response.json();
        if (data.results.length > 0) {
            const imageUrl = data.results[0].urls.regular;
            document.body.style.backgroundImage = `url(${imageUrl})`;
            document.body.style.backgroundSize = 'cover';
        } else {
            console.error('No images found for the weather description');
        }
    } catch (error) {
        console.error('Error fetching the background image:', error);
    }
}