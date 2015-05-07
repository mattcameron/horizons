
var bounds = new google.maps.LatLngBounds();
var locationPolys = [];
var map;


// function for drawing circles and returning their path
function drawCircle(point, radius, dir) {
  var d2r = Math.PI / 180;   // degrees to radians
  var r2d = 180 / Math.PI;   // radians to degrees
  var earthsradius = 3963; // 3963 is the radius of the earth in miles
  var points = 32;

  // find the raidus in lat/lon
  var rlat = (radius / earthsradius) * r2d;
  var rlng = rlat / Math.cos(point.lat() * d2r);

  var extp = new Array();
  if (dir==1)   {var start=0;var end=points+1} // one extra here makes sure we connect the ends
  else      {var start=points+1;var end=0}
  for (var i=start; (dir==1 ? i < end : i > end); i=i+dir) {
    var theta = Math.PI * (i / (points/2));
    ey = point.lng() + (rlng * Math.cos(theta)); // center a + radius x * cos(theta)
    ex = point.lat() + (rlat * Math.sin(theta)); // center b + radius y * sin(theta)
    extp.push(new google.maps.LatLng(ex, ey));
    bounds.extend(extp[extp.length-1]);
  }
  return extp;
}

function initialize() {
  // Create the map defaults.
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(-37.818291, 144.962457),
    styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
  };

  // declare the map as the 'map-canvas' div
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // get the checkpoints from the api
  $.ajax({
    url: "/api/checkpoints",
    method: "get"
  }).done(function(data) {

    // creates a new circle for each checkpoint
    $.each(data, function(index, value) {
      var newPoly = new google.maps.Polygon({
        strokeColor: '#000000',
        strokeOpacity: 0.8,
        strokeWeight: 0,
        fillColor: '#2ea5b9',
        fillOpacity: 0.6,
        map: map,
        paths: drawCircle(new google.maps.LatLng(value.latitude, value.longitude),.02,1),
        id: value.id
      })

      // show the new circle on the map
      newPoly.setMap(map);

      // push it to our locationPolys array
      locationPolys.push(newPoly)
    })

  });

    // make the map zoom to a level where all destination circles fit nicely
    map.fitBounds(bounds);
}

google.maps.event.addDomListener(window, 'load', initialize);
