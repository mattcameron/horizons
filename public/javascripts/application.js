
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
    // the user has won and the game is over
    if ( checkpoints.length === locationPolys.length ) {
    alert('WOOOO HOOOOO!!! YOU WON THE GAME!')
  } else {
    // game is still running
    alert('Congratulations, you reached a checkpoint!')
  };


  })

}

var currentRaceCheckpoints;
var userCheckpoints;
var elapsedTime;

// update html/css to show race progress stats for user
var setMeter = function() {
	setTimeout(function(){
		$('.meter').css('width', (userCheckpoints/currentRaceCheckpoints*100)+"%")},
		500
	);
	setTimeout(function(){
		$('.tally').html(userCheckpoints + "/" + currentRaceCheckpoints)},
		500
	);
}

//get the amount of current active race checkpoints 
var getRaceCheckpoints = function() {
		$.ajax({
	    url: "/api/checkpoints",
	    method: "get"
	  }).done(function(data) {
	  	currentRaceCheckpoints = data.length
	  });
}

//get the amount of completed checkpoints by a user for current race
var getUserCheckpoints = function() {
	 $.ajax({
	    url: "/api/checkpoints/completed",
	    method: "get"
	  }).done(function(data) {
	  	userCheckpoints = data.length
	  });
}

var checkProgress = function() {
	getUserCheckpoints();
	getRaceCheckpoints();
	setMeter();
}


$(document).ready(function(){
	setInterval(checkProgress(), 10000);
});