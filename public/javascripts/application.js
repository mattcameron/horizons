
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

        // check if this was the last checkpoint
        allCheckpoints();
      });
      return;
    };
  });
}


// check whether the user has hit all of the checkpoints
function allCheckpoints() {
  // get the user's completed checkpoints
  $.ajax({
    url: '/api/checkpoints/completed',
    method: 'get'
  }).done(function(checkpoints) {
    // check if the user has hit all of the checkpoints
    if ( checkpoints.length === locationPolys.length ) {

      //end the game
      $.ajax({
        url: '/api/gameover',
        method: 'post'
      }).done(function() {
        console.log('done')
    });

    alert('WOOOO HOOOOO!!! YOU WON THE GAME!')
  } else {
    // game is still running
    alert('Congratulations, you reached a checkpoint!')
  };


  })

}