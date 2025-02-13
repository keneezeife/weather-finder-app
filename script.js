const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found')

search.addEventListener('click', () => {

    const city = document.querySelector('.search-box input').value;
    
    // Return nothing if no value is searched
    if (city == '') return;

    // Get location coordinates from Open Mateo API

    const coordinates = fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`).then(response => response.json()).then(json => {
        
        json_keys = Object.keys(json)

        if (json_keys.includes('results')) {
            latitude = json.results[0].latitude
            longitude = json.results[0].longitude
            return [latitude, longitude]
        }    
    });

    const getWeather = () => {
        coordinates.then((lat_long) => {

            if(lat_long === undefined) {
                
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;

            } else {

                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat_long[0]}&longitude=${lat_long[1]}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`).then(response => response.json()).then(json => {       
    
                    const image = document.querySelector('.weather-box img');
                    const temperature = document.querySelector('.weather-box .temperature');
                    const description = document.querySelector('.weather-box .description');
                    const humidity = document.querySelector('.weather-details .humidity span');
                    const wind = document.querySelector('.weather-details .wind span');
    
                    container.style.height = '555px';
                    container.classList.add('active');
                    weatherBox.classList.add('active');
                    weatherDetails.classList.add('active');
                    error404.classList.remove('active');

                    setTimeout(() => {
                        container.classList.remove('active');
                    }, 2500);

                    //Getting Temperature from json    
                    temperature.innerHTML =`${parseInt(json.current.temperature_2m)}<span>°C</span>`;

                    //Getting Humidity and Wind Speed from json
                    humidity.innerHTML =`${json.current.relative_humidity_2m}%`;
                    wind.innerHTML =`${parseInt(json.current.wind_speed_10m)}km/h`;
                   
                    // Getting Weather Image and Detailed Weather Description from json
                    switch (json.current.weather_code) {
                        case 0:
                            image.src = '/images/clear.png';
                            description.innerHTML = 'Clear Skies';                
                            break;

                        case 1:
                            image.src = '/images/clear.png';
                            description.innerHTML = 'Mainly Clear';                
                            break;

                        case 2:
                            image.src = '/images/cloud.png';
                            description.innerHTML = 'Partly Cloudy';                
                            break;

                        case 3:
                            image.src = '/images/overcast.png';
                            description.innerHTML = 'Overcast Skies';                
                            break;

                        case 45:
                        case 48:
                            image.src = '/images/mist.png';
                            description.innerHTML = 'Fog';                
                            break;

                        case 51:
                        case 56:
                            image.src = '/images/rain.png';
                            description.innerHTML = 'Light Drizzle';                
                            break;

                        case 53:
                            image.src = '/images/rain.png';
                            description.innerHTML = 'Moderate Drizzle';                
                            break;

                        case 55:
                        case 57:
                            image.src = '/images/rain.png';
                            description.innerHTML = 'Heavy Drizzle';                
                            break;

                        case 61:
                        case 66:
                        case 80:
                            image.src = '/images/rain.png';
                            description.innerHTML = 'Slight Rain';                
                            break;

                        case 63:
                        case 81:
                            image.src = '/images/rain.png';
                            description.innerHTML = 'Moderate Rain';                
                            break;

                        case 65:
                        case 67:
                        case 82:
                            image.src = '/images/rain.png';
                            description.innerHTML = 'Heavy Rain';                
                            break;

                        case 71:
                        case 77:
                        case 85:
                            image.src = '/images/snow.png';
                            description.innerHTML = 'Slight Snow Fall';                
                            break;

                        case 73:
                            image.src = '/images/snow.png';
                            description.innerHTML = 'Moderate Snow Fall';                
                            break;

                        case 75:
                        case 86:
                            image.src = '/images/snow.png';
                            description.innerHTML = 'Heavy Snow Fall';                
                            break;

                        case 95:
                            image.src = '/images/thunder.png';
                            description.innerHTML = 'Thunderstorm';                
                            break;

                        case 96:
                        case 99:
                            image.src = '/images/thunder_hail.png';
                            description.innerHTML = 'Thunderstorm with Hail';                
                            break;
                        

                        default:
                            image.src = '/images/clear.png';
                            description.innerHTML = 'Clear';                 
                            break;
                    }
                    

                    // Transition Animation Script

                    const infoWeather = document.querySelector('.info-weather');
                    const infoHumidity = document.querySelector('.info-humidity');
                    const infoWind = document.querySelector('.info-wind');

                    const elCloneInfoWeather = infoWeather.cloneNode(true);
                    const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                    const elCloneInfoWind = infoWind.cloneNode(true);

                    elCloneInfoWeather.id = 'clone-info-weather';
                    elCloneInfoWeather.classList.add('active-clone');

                    elCloneInfoHumidity.id = 'clone-info-humidity';
                    elCloneInfoHumidity.classList.add('active-clone');

                    elCloneInfoWind.id = 'clone-info-wind';
                    elCloneInfoWind.classList.add('active-clone');

                    setTimeout(() => {
                        infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather)
                        infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity)
                        infoWind.insertAdjacentElement("afterend", elCloneInfoWind)
                    }, 2200);

                    const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
                    const totalCloneInfoWeather = cloneInfoWeather.length;
                    const cloneInfoWeatherFirst = cloneInfoWeather[0];

                    const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
                    const cloneInfoHumidityFirst = cloneInfoHumidity[0];

                    const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
                    const cloneInfoWindFirst = cloneInfoWind[0];

                    if (totalCloneInfoWeather > 0) {

                        cloneInfoWeatherFirst.classList.remove('active-clone');
                        cloneInfoHumidityFirst.classList.remove('active-clone');
                        cloneInfoWindFirst.classList.remove('active-clone');

                        setTimeout(() => {
                            cloneInfoWeatherFirst.remove();
                            cloneInfoHumidityFirst.remove();
                            cloneInfoWindFirst.remove();
                        }, 1000);
                    }
                    
    
                })
            }
        });
    };

    getWeather();


});
