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

	latitude: '51.5616944',
	longitude: '-0.098994'

};


//URL constructed by feeding off currentLocationData above
var weatherUrl =

	//base URL
	'https://api.forecast.io/forecast/' +

	//api key
	'82e82db3154d05e7a280bb8c248adee1' +

	// latitude (from currentLocationData, above)
	'/' +
	currentLocationData.latitude +

	// longitude (from currentLocationData, above)
	',' +
	currentLocationData.longitude


;

//Gets and stores current weather info based on constructed URL above
app.getCurrentWeatherInfo = function(){

	// weatherUrl hooks up to URL
	// puts data into currentWeatherData
	$.get(weatherUrl, function( currentWeatherData ){

		// Raw temp data
		var currentTemperature = currentWeatherData.currently.temperature;
		var currentLocationName = currentWeatherData.timezone;

		// Round down temperature and convert to C, then put '℃' at the end
		var currentTempInCelsius =  Math.round( currentTemperature - 32 * 0.5556 ) +'℃';

		// // print
		// console.log( 'Temp in K: ' + inKelvin );
		// console.log( 'Temp in C: ' + currentTempInCelsius );

		$( '.thermometer h1:first-of-type' ).text( currentLocationName );
		$( '.spinner' ).replaceWith( '<p class="js_temprature">' + currentTempInCelsius + '</p>' );



	});

};

// When page loads - TODO: add in geolocation step at start
app.init = function(){

		// uses constructed URL to display location name and weather info
		app.getCurrentWeatherInfo();

		// prints constructed URL in console for debugging purposes
		console.log( 'Source URL: '+ weatherUrl );

};

// init the app
app.init();
