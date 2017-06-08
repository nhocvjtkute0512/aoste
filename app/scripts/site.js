$(function() {

	if ($( window ).width() > 1024) {
		$('.register-slider').slider({
			speed: 500,
		});
	}

	$('.register').submit(function() {
		alert('abc');
	}


});