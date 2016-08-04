/*

Thermo weather app V0.1
Luke Forsythe

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

	var GEOlatitude = position.coords.latitude;
	console.log('GEOlat: ',GEOlatitude);

	var GEOlongitude = position.coords.longitude;
	console.log('GEOlong: ',GEOlongitude);

	app.makeUrl(GEOlatitude,GEOlongitude);


};

navigator.geolocation.getCurrentPosition(geoSuccess);

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

	app.doAjax(weatherUrl);

};

app.doAjax = function(weatherUrl) {

	// uses constructed URL (weatherUrl) to get weather data
	$.ajax( {
		url: weatherUrl,
		dataType: "jsonp",

		success: function (data) {

			//Print constructed URL
			console.log( 'AJAX fires, source URL: '+ weatherUrl );

			// Create variable object for api data
			var	currentWeatherData = {

				locationName: data.timezone,
				temperature: data.currently.temperature,
				summary: data.minutely.summary,
				icon: data.currently.icon,
				tempRounded: Math.round( data.currently.temperature )

			};

			app.updateWeatherInfo(currentWeatherData);

		}

		// error: function (somethingWentWrong) { }

});

};


// uses weather variables to display location name and weather info
app.updateWeatherInfo = function(weatherData){


	// var data = weatherData;

	// Print Location
	console.log(' - Location: ' + weatherData.locationName);
	// Location
	$( '.thermometer h1:first-of-type' ).text( weatherData.locationName );

	// Print Temp Rounded
	console.log(' - Temp Rounded: ' + weatherData.tempRounded);
	// Temp Rounded
	$( '.spinner' ).replaceWith( '<p class="js_temprature">' + weatherData.tempRounded +'℃' + '</p>' );

	// Print Summary
	console.log(' - Summary: ' + weatherData.summary);
	// Summary
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
