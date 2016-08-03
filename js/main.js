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


	console.log('geoSuccess fires');
	console.log('lat =' + position.coords.latitude);
	console.log('long =' + position.coords.longitude);

	var GEOlatitude = position.coords.latitude;
	var GEOlongitude = position.coords.longitude;
	console.log('GEOlat: ',GEOlatitude);
	console.log('GEOlong: ',GEOlongitude);

	app.makeUrl(GEOlatitude,GEOlongitude);


};

navigator.geolocation.getCurrentPosition(geoSuccess);

// // Contains location data - TODO: make dynamic with HTML getLocation
// var currentLocationData = {
//
// 	latitude: GEOlatitude,
// 	longitude: GEOlongitude
//
// };

//URL constructed by feeding off currentLocationData above

app.makeUrl = function(GEOlatitude,GEOlongitude) {

	var weatherUrl =

		//base URL
		'https://api.forecast.io/forecast/' +
		//api key
		'82e82db3154d05e7a280bb8c248adee1' +
		// latitude (from currentLocationData, above)
		'/' +
		GEOlatitude +
		// longitude (from currentLocationData, above)
		',' +
		GEOlongitude +
		// sets to local units
		'?units=auto'
		;

	console.log(weatherUrl);

	app.doAjax(weatherUrl);

};

app.doAjax = function(weatherUrl) {

// uses constructed URL (weatherUrl) to get weather data
$.ajax( {
	url: weatherUrl,
	dataType: "jsonp",

	success: function (data) {

		console.log( 'AJAX fires, source URL: '+ weatherUrl );
		console.log('api toplevel data???: ' + data);
		console.log('api sublevel data: ' + data.minutely.summary);

		// Create variable object for api data
		var	currentWeatherData = {

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

};


// uses weather variables to display location name and weather info
app.updateWeatherInfo = function(weatherData){


	// var data = weatherData;
	console.log('data is here====>', weatherData);

	console.log('app.updateWeatherInfo fires');

	console.log('api data in updateWeatherInfo???: ' + weatherData);

	console.log(' - Location: ' + weatherData.locationName);
	$( '.thermometer h1:first-of-type' ).text( weatherData.locationName );

	console.log(' - Temp Rounded: ' + weatherData.tempRounded);
	$( '.spinner' ).replaceWith( '<p class="js_temprature">' + weatherData.tempRounded +'℃' + '</p>' );

	console.log(' - Summary: ' + weatherData.summary);
	$( '.summary' ).text( weatherData.summary );


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
