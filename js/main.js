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

// check for Geolocation support
if (navigator.geolocation) {
	console.log('Geolocation is supported!');
	}
	else {
  console.log('Geolocation is not supported for this Browser/OS version yet.');
}

//Obtain user location cordinatess

	var startPos;
	var geoSuccess = function(position) {
	  startPos = position;
	  console.log('lat =' + startPos.coords.latitude);
	  console.log('long =' + startPos.coords.longitude);
		console.log( geoSuccess );
	};
	navigator.geolocation.getCurrentPosition(geoSuccess)
;

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
	currentLocationData.longitude +

	// sets to local units
	'?units=auto'

;

// uses constructed URL to display location name and weather info
$.ajax( {
	url: weatherUrl,
	dataType: "jsonp",

	success: function (currentWeatherData) {

		console.log('Dark Sky is working!');

		console.log(currentWeatherData);

		// Create raw weather data variables
		var currentTemperature = currentWeatherData.currently.temperature;
		var currentLocationName = currentWeatherData.timezone;
		var currentSummary = currentWeatherData.minutely.summary;
		var currentIcon = currentWeatherData.currently.icon;

		// Round down temperature and convert to C, then put '℃' at the end
		var currentTempRounded =  Math.round( currentTemperature );

		$( '.thermometer h1:first-of-type' ).text( currentLocationName );
		$( '.spinner' ).replaceWith( '<p class="js_temprature">' + currentTempRounded+'℃' + '</p>' );
		$( '.summary' ).text( currentSummary );

		// console.log(currentSummary);

	}

	// error: function (somethingWentWrong) {
	//
	// }

});

//When page loads - TODO: add in geolocation step at start
app.init = function() {

		//ajax
		$.ajax();

		// prints constructed URL in console for debugging purposes
		console.log( 'Source URL: '+ weatherUrl );

};

// app.init()

$(geoSuccess).load( console.log("This should show after lat and long load...") );
