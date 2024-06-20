# weatherforecast
This project is a weather forecasting webpage for a European travel agency. It allows website visitors to look up a 7-day weather forecast for major European cities. The goal is to keep visitors engaged and encourage more travel bookings.


### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/weather-forecast.git
    ```
2. **Navigate to the project directory:**
    ```sh
    cd weather-forecast
    ```
3. **Open the project in Visual Studio Code:**
    ```sh
    code .
    ```

### Usage

1. **Open `index.html` in Live Server:**
    - Right-click on `index.html` and select "Open with Live Server."
    - The webpage will open in your default web browser.

2. **Select a city:**
    - Use the dropdown menu to select a city.

3. **Get the forecast:**
    - Click the "Get Forecast" button to fetch and display the weather forecast.

## API Reference

**7Timer API**
- Base URL: `http://www.7timer.info/bin/api.pl`
- Endpoint: 
    ```sh
    http://www.7timer.info/bin/api.pl?lon={longitude}&lat={latitude}&product=civil&output=json
    ```

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [7Timer API](http://www.7timer.info/doc.php?lang=en)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- Weather icons from [Icons8](https://icons8.com/)

## Contact

Project Link: https://github.com/momo285/weatherforecast
