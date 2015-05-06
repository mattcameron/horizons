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

      // display a message (or something more exciting)
      alert('Congratulations, you reached a checkpoint!')
      });
      return;
    }
  });
}