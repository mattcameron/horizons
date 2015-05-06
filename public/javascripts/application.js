
  // checkpoints reached
  var checkpointsHit = [];


// function to check whether a specific point is within any of our checkpoints
function inCheckpoint(point) {
  $.each(locationPolys, function(index, value) {

    // if the point is in a waypoint
    if (google.maps.geometry.poly.containsLocation(point, value)) {

      // remove the checkpoint
      value.setMap(null);

      // add the checkpoint to the database
      var url = 'api/checkpoints/' + value.id + '/new'
      $.ajax({
        url: url,
        method: 'post'
      }).done(function() {

        // add the checkpoints to checkpointsHit
        checkpointsHit.push(value.id);

        // check if the game is over
        allCheckpoints();
      });
      return;
    };
  });
}

function allCheckpoints() {
  if ( checkpointsHit.length === locationPolys.length ) {
    // the user has won and the game is over
    alert('WOOOO HOOOOO!!! YOU WON THE GAME!')
  } else {
    // game is still running
    alert('Congratulations, you reached a checkpoint!')
  };
}