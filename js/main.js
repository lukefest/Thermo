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
	console.log('Geolocation is working...');
	}
	else {
  console.log('Geolocation is not supported for this Browser/OS version yet.');
}

//Obtain user location cordinatess
var geoSuccess = function(position) {

	console.log('geoSuccess lat =', + position.coords.latitude);
	console.log('geoSuccess long =', + position.coords.longitude);

};

navigator.geolocation.getCurrentPosition(geoSuccess);

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

var currentWeatherData;

// uses constructed URL (weatherUrl) to get weather data
$.ajax( {
	url: weatherUrl,
	dataType: "jsonp",

	success: function (data) {

		console.log( 'AJAX fires, source URL: '+ weatherUrl );
		console.log('api toplevel data???: ' + data);
		console.log('api sublevel data: ' + data.minutely.summary);

		// Create variable object for api data
		currentWeatherData = {

			locationName: data.timezone,
			temperature: data.currently.temperature,
			summary: data.minutely.summary,
			icon: data.currently.icon,
			tempRounded: Math.round( data.currently.temperature )

		};

		// var currentLocationName = currentWeatherData.timezone;
		// var currentTemperature = currentWeatherData.currently.temperature;
		// var currentSummary = currentWeatherData.minutely.summary;
		// var currentIcon = currentWeatherData.currently.icon;
		// // Round down temperature and convert to C, then put '℃' at the end
		// var currentTempRounded =  Math.round( currentTemperature );

		// console.log('api currentWeatherData inside: ' + currentWeatherData);
		// console.log('api currentWeatherData inside====>> ', currentWeatherData);

		//spits out api data
		// return currentWeatherData;

		app.updateWeatherInfo(currentWeatherData);

	}
	// error: function (somethingWentWrong) {
	//
	// }

});



// uses weather variables to display location name and weather info
app.updateWeatherInfo = function(currentWeatherData){

	// var data = currentWeatherData;
	console.log('data is here====>', currentWeatherData);

	console.log('app.updateWeatherInfo fires');

	console.log('api data in updateWeatherInfo???: ' + currentWeatherData);

	console.log(' - Location: ' + currentWeatherData.locationName);
	$( '.thermometer h1:first-of-type' ).text( currentWeatherData.locationName );

	console.log(' - Temp Rounded: ' + currentWeatherData.tempRounded);
	$( '.spinner' ).replaceWith( '<p class="js_temprature">' + currentWeatherData.tempRounded +'℃' + '</p>' );

	console.log(' - Summary: ' + currentWeatherData.summary);
	$( '.summary' ).text( currentWeatherData.summary );


};


// //When page loads - TODO: add in geolocation step at start
// app.init = function(currentWeatherData) {
//
// 	console.log( 'app.init fires' );
//
// 	// app.updateWeatherInfo();
//
// 	// prints constructed URL in console for debugging purposes
//
// };


// $( geoSuccess ).ready(function() {
//
//
//
// });
