$(function() {

	if ($(window).width() > 1024) {
		$('.register-slider').slider({
			speed: 500,
			dot: true
		});
	}

  $(".select-day").click(function(e){
    $('.day-list').slideToggle();
    e.stopPropagation();
  });

  $('.day-item').click(function() {
  	$('.selection-day').text($(this).text())
  });

  $(".select-month").click(function(e){
    $('.month-list').slideToggle();
    e.stopPropagation();
  });

  $('.month-item').click(function() {
  	$('.selection-month').text($(this).text())
  });

  $(".select-year").click(function(e){
    $('.year-list').slideToggle();
    e.stopPropagation();
  });

  $('.year-item').click(function() {
  	$('.selection-year').text($(this).text())
  	console.log($(this).text());
  });

  $('body').click(function() {
  	$('.day-list, .month-list, .year-list').slideUp();
  });


});
