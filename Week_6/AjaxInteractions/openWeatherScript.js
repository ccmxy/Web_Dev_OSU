var apiKey = '11b835882ad67fe8e1c685e1cbac46fa';

document.getElementById("citySubmit").addEventListener('click', function(event) {
    event.preventDefault();
    var cityNameInput = document.getElementById('cityNameInput').value;
    zipInput = document.getElementById('zipInput').value;
    //If there is either just zipInput or zipInput with cityNameInput (we prioritize zipcode):
    if (zipInput) {
        var requestUrl = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipInput + ",us&appid=" + apiKey;
    }
    //If there is just cityNameInput:
    else if (!zipInput && cityNameInput) { //If there is only zip input
        var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + ",us&appid=" + apiKey;
    } else { //If neither:
        return;
    }
    document.getElementById("weatherForm").reset(); //Clear the input values
    getWeather(requestUrl); //Give the user weather info
});

function getWeather(requestUrl) {
    var req = new XMLHttpRequest();
    req.open("GET", requestUrl, true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            console.log(response);
            console.log("request url: " + requestUrl);
            var tempKelvin = response.main.temp;
            var tempFar = kelvinToFahrenheit(tempKelvin);
            document.getElementById('topLabel').textContent = ("The current weather in " + response.name + ":");
            document.getElementById('temperatureKelvin').textContent = tempKelvin;
            document.getElementById('temperatureFar').textContent = tempFar;
            document.getElementById('humidity').textContent = (response.main.humidity + "%");
            var unhideWeather = document.getElementById('weatherThings');
            if (unhideWeather) {
                unhideWeather.id = 'stopHidingWithCSS';
            }
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(null); //specify no additional data being sent
}

function kelvinToFahrenheit(tempKelvin) {
    kelvinInt = Number(tempKelvin);
    var tempFahrenheit = Math.round((kelvinInt * (9 / 5)) - 459.67);
    return tempFahrenheit;
}
