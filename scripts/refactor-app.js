/*

var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;



function Map (lat, lng){
    this.lat = lat;
    this.lng = lng;
}



Map.prototype = {
 newMap: function () {
    new google.maps.Map(document.getElementById('map'), {
          center: pos,
          zoom: 2
        });
 }

};

*/

$(document).on("ready", function() {


    $quakesList = $.ajax({
        method: "GET",
        url: weekly_quakes_endpoint
    })

    .done(function(data){
        onSuccess(data);
    })

    .fail(function(message) {
        console.log("Error: ", message);
    });



function onSuccess(data) {
    var mapEvents = data.features;
    makeMarkers(mapEvents);
    compileHandlebarsTemplate(mapEvents, "#info", "#quakes-template");
}


function makeMarkers(locationArray) {
    locationArray.forEach(function(location) {
        var tempLat = location.geometry.coordinates[1];
        var tempLng = location.geometry.coordinates[0];
        new google.maps.Marker({
            position: new google.maps.LatLng(tempLat, tempLng),
            map: map,
            title: location.properties.title
        });
    });

}

function compileHandlebarsTemplate(data, targetHtml, targetScript) {
    var source = $(targetScript).html();
    template = Handlebars.compile(source);

    var dataTemplate = template({events: data});

    $(targetHtml).append(dataTemplate);

}


    

/*
        var source = $("#quakes-template").html();
        template = Handlebars.compile(source);

        var quakesTemplate = template({quakes: earthquakes});
       
        $("#info").append(quakesTemplate);


        earthquakes.forEach(function(quake){
            var tempLat = quake.geometry.coordinates[1];
            var tempLng = quake.geometry.coordinates[0];
            new google.maps.Marker({
                position: new google.maps.LatLng(tempLat, tempLng),
                map: map,
                title: quake.properties.title
            });
            
        });

    })

    .fail(function(response){
        console.log("Error: ", response);
    });
});

    
    function initMap() {
        var pos = {lat: 37.78, lng: -122.44};

        map = new google.maps.Map(document.getElementById('map'), {
          center: pos,
          zoom: 2
        });

        // var marker = new google.maps.Marker({
        //     position: pos,
        //     map: map,
        //     title: "San Francisco"
        // })
      }





