
var currentRaceCheckpoints;
var userCheckpoints;


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
        compareCheckpointsSetMeter()
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
  // check if the user has hit all of the checkpoints
  if ( userCheckpoints === currentRaceCheckpoints ) {
    //end the game
    gameOver();
    alert('WOOOO HOOOOO!!! YOU WON THE GAME!')
  } else {
    // game is still running
    alert('Congratulations, you reached a checkpoint!')
  };

}


function gameOver() {
  $.ajax({
        url: '/api/gameover',
        method: 'post'
      });
}


// var raceCreatedAt;
// var elapsedTime;
// var milliseconds = new Date().getTime();

// update html/css to show race progress stats for user
var setMeter = function() {
    $('.inGame-Meter, .meter').css('width', (userCheckpoints/currentRaceCheckpoints*100)+"%");
    $('.tally').html(userCheckpoints + "/" + currentRaceCheckpoints);
}

//get the amount of current active race checkpoints
function compareCheckpointsSetMeter() {
		$.ajax({
	    url: "/api/checkpoints",
	    method: "get"
	  }).done(function(data) {
	  	currentRaceCheckpoints = data.length
       $.ajax({
          url: "/api/checkpoints/completed",
          method: "get"
        }).done(function(data) {
          userCheckpoints = data.length
          setMeter();
        });
	  });
}





/* Race clock *****************/

function startTime() {
    var today = $('.timer-InGame').html();
    var split_today = today.split(':');
    var hours= parseInt(split_today[0]);
    var minutes= parseInt(split_today[1]);
    var seconds= parseInt(split_today[2]);

    if (seconds < 62) {
      seconds++
    };
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++
    };
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    $('.timer-InGame').html(hours+":"+minutes+":"+seconds);
    var time = setTimeout(function(){startTime()},1000);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}



/*************************************/


$(document).ready(function(){

	  $('.colour-marker').each(function() {
        $(this).css('color', getRandomColour());
    });

    // compareCheckpointsSetMeter()
    startTime();

});





// Parallax stuff

$('#Horizons-Page-1').mousemove(function(e){
    var amountMovedX = (e.pageX * -1 / 25);
    $(this).css('background-position', amountMovedX + 'px ' );
});

