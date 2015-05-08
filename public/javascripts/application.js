
// Generate random hex colour for markers on index
function getRandomColour() {
    var letters = '123456789abcdef'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


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

        //  get user & race checkpoints, compare, then update tally
        checkProgress();
        // check if this was the last checkpoint
        allCheckpoints();
      });

        // remove this checkpoint from the locationPolys array
        locationPolys.splice(index, 1);

        // remove the marker from the array and the map
        checkpointMarkers[index].setMap(null);
        checkpointMarkers.splice(index, 1);

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
      gameOver();

    alert('WOOOO HOOOOO!!! YOU WON THE GAME!')
  } else {
    // game is still running
    alert('Congratulations, you reached a checkpoint!')
  };


  })

}


function gameOver() {
  $.ajax({
        url: '/api/gameover',
        method: 'post'
      });
}

var currentRaceCheckpoints;
var userCheckpoints;

// var raceCreatedAt;
// var elapsedTime;
// var milliseconds = new Date().getTime();

// update html/css to show race progress stats for user
var setMeter = function() {
	setTimeout(function(){
		$('.inGame-Meter').css('width', (userCheckpoints/currentRaceCheckpoints*100)+"%")},
		700
	);
	setTimeout(function(){
		$('.tally').html(userCheckpoints + "/" + currentRaceCheckpoints)},
		700
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

// get created_at time of current race
// var getCreatedAtTime = function() {
// 		$.ajax({
// 	    url: "/api/race",
// 	    method: "get"
// 	  }).done(function(data) {
// 	  	console.log(data);
// 	  	raceCreatedAt = data;
// 	  	elapsedTime = milliseconds - raceCreatedAt + 36000000;
// 	  });

// }



/*covert milliseconds to readable time *****************/

// function msToTime(s) {
//   var ms = s % 1000;
//   s = (s - ms) / 1000;
//   var secs = s % 60;
//   s = (s - secs) / 60;
//   var mins = s % 60;
//   var hrs = (s - mins) / 60;

//   console.log(hrs + ':' + mins + ':' + secs);
//   return hrs + ':' + mins + ':' + secs;
// }

/*************************************/


$(document).ready(function(){

	setInterval(checkProgress(), 10000);

	  $('.colour-marker').each(function() {
        $(this).css('color', getRandomColour());
    });

    $('#fullpage').fullpage({

        navigation: true,
        navigationPosition: 'right',
        

      verticalCentered: false
    });

	// getCreatedAtTime()

	// setTimeout(msToTime(elapsedTime), 3000);
});





// Parallax stuff

$('#Horizons-Page-1').mousemove(function(e){
    var amountMovedX = (e.pageX * -1 / 25);
    $(this).css('background-position', amountMovedX + 'px ' );
});

