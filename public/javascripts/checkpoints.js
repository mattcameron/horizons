
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

// function to check whether a specific point is in any of our destination location circles
function inCircle(point, polys) {
  $.each(polys, function(index, value) {

    // if the point is in a waypoint
    if (google.maps.geometry.poly.containsLocation(point, value)) {

      // remove the checkpoint
      value.setMap(null);

      // display a message
      alert('Congratulations, you reached a checkpoint!')
    } else {
      return false;
    }
  });

}

function initialize() {
  // Create the map defaults.
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(-37.818291, 144.962457)
  };

  // declare the map as the 'map-canvas' div
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // setting an empty array for checkpoints
  var checkpoints = [];

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
        fillColor: '#0000FF',
        fillOpacity: 0.7,
        map: map,
        paths: drawCircle(new google.maps.LatLng(value.latitude, value.longitude),.03,1)
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
