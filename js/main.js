/*

- Sign up for openweathermap.org and generate an API key.
- User either $.ajax or $.get to pull weather current data for London
- Print the currentTemperature in console.
- Possible next steps
- 1: Display the currentTemperature in the UI rather than the console
- 2: Display an icon or image depending on the current weather
- 3: add a form prompting user for the city.
- 4: add a toggle for switching between farenheit and celcius

*/


// App container... that doesnt seem to contain anything
var app = {};

// Contains location data - TODO: make dynamic with HTML getLocation
var currentLocationData = {

	longitude: '-0.098994',
	latitude: '51.5616944'

};

//Smart URL feeding off currentLocationData
var weatherUrl =

	//base URL
	'http://api.openweathermap.org/data/2.5/weather?' +

	// latitude (from currentLocationData, above)
	'lat=' +
	currentLocationData.latitude +

	// longitude (from currentLocationData, above)
	'&lon=' +
	currentLocationData.longitude +

	//api key
	'&APPID=' +
	'ac87f301d099eb66d6de796e5fd50b47'
;

//Stores current temperature
app.getCurrentWeatherInfo = function(){

	// weatherUrl hooks up to URL
	// puts data into currentWeatherData
	$.get(weatherUrl, function( currentWeatherData ){

		// Raw temp data
		var currentTemperature = currentWeatherData.main.temp;
		var currentLocationName = currentWeatherData.name;

		// Round down temperature and stick 'F' at the end
		// var inKelvin = Math.floor( currentTemperature )+'K';

		// Round down temperature and stick 'C' at the end
		var currentTempInCelsius =  Math.round(currentTemperature - 273.15) +'℃';

		// // print
		// console.log( 'Temp in K: ' + inKelvin );
		// console.log( 'Temp in C: ' + currentTempInCelsius );

		$( '.thermometer h1:first-of-type' ).text( currentLocationName );
		$( '.spinner' ).replaceWith( '<p class="js_temprature">' + currentTempInCelsius + '</p>' );



	});

};

// What happens on init
app.init = function(){

		app.getCurrentWeatherInfo();

		console.log( 'Source URL: '+ weatherUrl );

};

// init the app
app.init();
