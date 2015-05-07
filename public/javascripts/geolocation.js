var currentPosition;
var currentPositionMarker;

// check if qeolocation is available on this device
if ("geolocation" in navigator) {

  //function to run each time the current location changes
  function success(position) {

    currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    // clear old marker (if there is one)
    if (currentPositionMarker) {
      currentPositionMarker.setMap(null);
    }

    // plot new marker on the map
    currentPositionMarker = new google.maps.Marker({
      position: currentPosition,
      map: map,
      optimized: false,
      icon: "img/checkPointsMarker.gif",
      title: 'My Current Position!'
    });

    //check if the current position is within a checkpoint
    inCheckpoint(currentPosition)
  }

  // function to run if there is an error getting the current location
  function error() {
    alert("There was an error getting your location.")
  }

  // watchPosition options
  var options = {
    enableHighAccuracy: false
  };

  navigator.geolocation.watchPosition(success, error, options);

} else {  // redirect if geolocation not available
  alert("Geolocation is not available on this device. This game will not work :(")
    window.location.replace("/")
}

