// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {

	initMap();

	$quakesList = $.ajax({
		method: "GET",
		url: weekly_quakes_endpoint
	})

	.done (function(data) {

		var earthquake = data.features;

		var source = $("#quakes-template").html();

		template = Handlebars.compile(source);
		
		var quakesTemplate = template({quakes: earthquake});

		$("#info").append(quakesTemplate);

		earthquakes.forEach(function(quake) {
		var tempLat = quake.geometry.coordinates[1];
		var tempLng = quake.geometry.coordinates[0];

		new google.maps.Marker({
			position: new google.maps.LatLng(tempLat, tempLng),
			map: map,
			title: earthquakes[0].properties.title
		});
	})


})
	.fail (function(response) {
		console.log("Error: ", response);

	});
});

function initMap() {

	var pos = {lat: 37.78, lng: -122.42};

	map = new google.maps.Map(document.getElementById('map'), {
		center: pos,
		zoom: 11
	});

	var marker = new google.maps.Marker({
		position: pos,
		map: map,
		title: 'San Francisco'
	});

	}
