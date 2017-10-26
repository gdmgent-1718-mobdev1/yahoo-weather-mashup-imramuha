
function CurrentWeatherService() {

    var apiKey = "d1715107a40f464293f130757172310"; 
    const URL = 'https://api.apixu.com/v1/forecast.json?key=' + apiKey + '&q=' + window.city;
     

    function loadCurrentWeather() {
       
        return AJAX.getJSONByPromise(URL);

    }

    

    return {
       loadCurrentWeather: loadCurrentWeather
    }
};


