
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


