document.addEventListener("DOMContentLoaded", function () {
    const cityForm = document.getElementById("cityForm");
    const citySelect = document.getElementById("city");
    const weatherResults = document.getElementById("weatherResults");

    // Mapping weather conditions to corresponding icon filenames
    const weatherIconMap = {
        'clearday': 'clear.png',
        'clearnight': 'clear.png',
        'pcloudyday': 'pcloudy.png',
        'pcloudynight': 'pcloudy.png',
        'mcloudyday': 'mcloudy.png',
        'mcloudynight': 'mcloudy.png',
        'cloudy': 'cloudy.png',
        'humidday': 'humid.png',
        'humidnight': 'humid.png',
        'lightrainday': 'lightrain.png',
        'lightrainnight': 'lightrain.png',
        'ishower': 'ishower.png',
        'oshower': 'oshower.png',
        'lightsnowday': 'lightsnow.png',
        'lightsnownight': 'lightsnow.png',
        'rain': 'rain.png',
        'rainsnow': 'rainsnow.png',
        'snow': 'snow.png',
        'tsrainday': 'tsrain.png',
        'tsrainnight': 'tsrain.png',
        'tstorm': 'tstorm.png',
        'windy': 'windy.png'
    };

    // Fetch the CSV file containing city coordinates
    fetch('city_coordinates.csv')
        .then(response => {
            console.log('Fetching CSV file...');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('CSV Data:', data); // Debugging statement
            const cities = data.split('\n').slice(1).map(row => row.split(',')); // Skip the header row
            console.log('Parsed Cities:', cities); // Debugging statement
            cities.forEach(city => {
                if (city[2]) { // city[2] contains the city name
                    const option = document.createElement("option");
                    option.value = `${city[0]},${city[1]}`; // city[0] is latitude, city[1] is longitude
                    option.text = `${city[2]}, ${city[3]}`; // city[2] is city name, city[3] is country
                    citySelect.appendChild(option);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching the CSV file:', error); // Debugging statement
        });

    cityForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const coords = citySelect.value.split(',');
        const lat = coords[0];
        const lon = coords[1];
        console.log(`Fetching weather data for: Lat=${lat}, Lon=${lon}`); // Debugging statement

        fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather Data:', data); // Debugging statement
                displayWeather(data.dataseries);
            })
            .catch(error => {
                console.error("Error fetching the weather data:", error);
            });
    });

    function displayWeather(data) {
        weatherResults.innerHTML = "";
        const now = new Date(); // Current date and time
        data.forEach(item => {
            console.log('Weather Item:', item); // Debugging statement

            // Calculate the date from the timepoint
            const date = new Date(now.getTime() + item.timepoint * 3600000); // Add hours in milliseconds
            console.log('Calculated Date:', date); // Debugging statement

            // Handle temperature as a single value
            const temp = item.temp2m !== undefined ? item.temp2m : 'N/A';
            console.log('Temperature:', temp); // Debugging statement

            const weatherCondition = item.weather ? item.weather : 'N/A';
            console.log('Weather Condition:', weatherCondition); // Debugging statement

            if (weatherIconMap[weatherCondition]) {
                const weatherIcon = weatherIconMap[weatherCondition];
                console.log('Weather Icon:', weatherIcon); // Debugging statement

                const weatherItem = document.createElement("div");
                weatherItem.className = "weather-item";
                weatherItem.innerHTML = `
                    <h3>${date.toDateString()}</h3>
                    <p>Temperature: ${temp}°C</p>
                    <p>Weather: <img src="images/${weatherIcon}" alt="${weatherCondition}"></p>
                `;
                weatherResults.appendChild(weatherItem);
            } else {
                console.warn(`Weather condition "${weatherCondition}" not found in weatherIconMap.`);
                const weatherItem = document.createElement("div");
                weatherItem.className = "weather-item";
                weatherItem.innerHTML = `
                    <h3>${date.toDateString()}</h3>
                    <p>Temperature: ${temp}°C</p>
                    <p>Weather: ${weatherCondition}</p>
                `;
                weatherResults.appendChild(weatherItem);
            }
        });
    }
});
