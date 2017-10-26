// USING https://www.apixu.com for API because yahoo one wasn't showing anything outside of US.

// APP CONSTRUCTOR
function App() {
    let _currentWeatherService,
        _currentWeatherElement,
        _currentWeatherData;
        _currentIconElement = [];                                                       // create a empty array to save wheater condition into it
        


    function init(){		// om het app te initializeren.
        console.log('1 Initialize the application');
        console.log('1.1 Create a ParkingStatesService object');
        _currentWeatherService = new CurrentWeatherService();
        console.log('1.2 Chache the active DOM-elements');
        _currentWeatherElement = document.querySelector('.current-weather');
        console.log('1.3 Load the parking states via _parkingStatesService object');
        loadCurrentWeatherData();
    }

    function loadCurrentWeatherData() {
        _currentWeatherService.loadCurrentWeather()
            .then(function(data) {
                console.log('2.1 Save the loaded data in _currentParkingStatesData');
                _currentWeatherData = data;
                console.log(_currentWeatherData);
                console.log('2.2 Update parking states user interface');                
                showCorrectIcons();

                updateCurrentWeatherUI();
              
                
                
               
            })
            .catch(function(reject) {
                alert("Please search something that actually exists.")
                console.log('SPIJTIG');
            });
    }
    
    function updateCurrentWeatherUI() {
        //if(_currentWeatherElement != null /*&& _currentWeatherElement != undefined &&  _currentWeatherData != null &&  _currentWeatherData != undefined && _currentWeatherData.length > 0*/) {
            //console.log('2.3 The weather is updated');
            let tempStr = '';                                                                       // create a temporary string
            // show the location
            //console.log(_currentWeatherData.location);
            // show the name of the city
            //console.log(_currentWeatherData.location.name);
            //console.log(_currentWeatherData.forecast.forecastday[0].hour[8]);
            //console.log(_currentWeatherData.forecast.forecastday[0].hour[12]);
            //console.log(_currentWeatherData.forecast.forecastday[0].hour[16]);
            //console.log(_currentWeatherData.forecast.forecastday[0].hour[21]);
            //console.log('3.1 Loop through the parking states');
            console.log(_currentIconElement);
            
                tempStr += `
                
                <div class="card">
                <span class="city">Today's Weather: ${_currentWeatherData.location.name}</span>
                <div class="${_currentWeatherData.current.condition.text}"></div>
                <span class="temp">${_currentWeatherData.current.temp_c}&#8451;</span>
                <span>
                  <ul class="variations">
                    <li>${_currentWeatherData.current.condition.text}</li>
                    <li><span class="speed">${_currentWeatherData.current.wind_kph}<span class="kph">mph</span></span></li>
                  </ul>
                </span>
                <div class="forecast clear">
                  <div class="time _8h">08:00
                    <br> <span class=${_currentIconElement[0]}></span> <br> <span>${_currentWeatherData.forecast.forecastday[0].hour[8].temp_c}&#8451;</span> <br> <span class="lowTemp">${_currentWeatherData.forecast.forecastday[0].hour[8].condition.text}</span>
                  </div>
                  <div class="time _12h">12:00
                     <br> <span class=${_currentIconElement[1]}></span> <br> <span>${_currentWeatherData.forecast.forecastday[0].hour[12].temp_c}&#8451</span> <br> <span class="lowTemp">${_currentWeatherData.forecast.forecastday[0].hour[12].condition.text}</span>
                  </div>
                  <div class="time _16h">16:00
                    <br> <span class=${_currentIconElement[2]}></span> <br> <span>${_currentWeatherData.forecast.forecastday[0].hour[16].temp_c}&#8451</span> <br> <span class="lowTemp">${_currentWeatherData.forecast.forecastday[0].hour[16].condition.text}</span>
                  </div>
                  <div class="time _21h">21:00
                    <br> <span class=${_currentIconElement[3]}></span> <br> <span>${_currentWeatherData.forecast.forecastday[0].hour[20].temp_c}&#8451</span> <br> <span class="lowTemp">${_currentWeatherData.forecast.forecastday[0].hour[20].condition.text}</span>                  
                    </div>
                </div>
              </div>
              
                `;
               
            
            _currentWeatherElement.innerHTML = tempStr;
        //}
    }
    

    // what this does is:
    // it this function runs 4 times each time adding 4hours to the clock
    // it checks the condition text for 8/12/16/80 o'clock and changes the _currentCharacterElement each time we updateCurrentWeatherUi();
    // each time it update, it implements a class with name according to the if/else if conditions that we've but here:
    function showCorrectIcons(weatherIcon){
        for (i=8; i<=20; i+=4 ){
            console.log(i);
           
            if (_currentWeatherData.forecast.forecastday[0].hour[i].condition.text == "Partly cloudy"){
                _currentIconElement.push("Partly");                                     // push into our empty array (it push i times and 8/12/16/20h will have their own index aswel)
               
            } else if (_currentWeatherData.forecast.forecastday[0].hour[i].condition.text == "Cloudy")  {
                _currentIconElement.push("Cloudy");
                
            } else if (_currentWeatherData.forecast.forecastday[0].hour[i].condition.text == "Clear")  {
                _currentIconElement.push("Sunny");
                
            } else if (_currentWeatherData.forecast.forecastday[0].hour[i].condition.text == "Sunny")  {
                _currentIconElement.push("Sunny");
               
            } else if (_currentWeatherData.forecast.forecastday[0].hour[i].condition.text == "Patchy rain possible" || _currentWeatherData.forecast.forecastday[0].hour[i].condition.text == "Light rain shower" ||  _currentWeatherData.forecast.forecastday[0].hour[i].condition.text == "Moderate rain")  {
                _currentIconElement.push("Light");
                              
            } else if (_currentWeatherData.forecast.forecastday[0].hour[i].condition.text == "Heavy rain")  {
                
                _currentIconElement.push("Heavy");
               
            } else if (_currentWeatherData.forecast.forecastday[0].hour[i].condition.text == "Overcast")  {
                
                _currentIconElement.push("Overcast");
                
            } else if (_currentWeatherData.forecast.forecastday[0].hour[i].condition.text == "Mist" || _currentWeatherData.forecast.forecastday[0].hour[i].condition.text == "Fog")  {
                _currentIconElement.push("Mist");
                
            } else if (_currentWeatherData.forecast.forecastday[0].hour[i].condition.text == "Snow")  {
                _currentIconElement.push("Snow");
               
            } else {
                _currentIconElement.push("Unknown");
            } 
        }
    }
    
    return {
        init: init
    };
  
};


document.querySelector('.stickyNoteSearchForm').addEventListener('submit', function (e) {
 
    //prevent the normal submission of the form
    e.preventDefault();

    window.city = document.querySelector('.input-search').value;

    console.log(window.city);

    // load event window object
    // all resources are loaded
    // Make new instance of app
        const app = new App();
        app.init();
    
 });

   

