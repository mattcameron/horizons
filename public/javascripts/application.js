
$('#join_race_btn').on('click', function() {
	navigator.geolocation.getCurrentPosition(function(position) {
		$.ajax({
			url: '/race/join/position.coords.latitude/position.coords.longitude',
			method: 'post'
		}).done(function() {
			console.log("done")
		}).fail(function(error) {
			console.log(error)
		});
	});
})

var race_id = 1;
var user_id = 1;
var currentRaceCheckpoints;
var userCheckpoints;
var elapsedTime;

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

var getRaceCheckpoints = function() {
		$.ajax({
	    url: "/api/get_race_cp/"+race_id,
	    method: "get"
	  }).done(function(data) {
	  	currentRaceCheckpoints = data.length
	  });
}

var getUserCheckpoints = function() {
	 $.ajax({
	    url: "/api/get_user_cp/"+user_id,
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



