$(document).ready(function() {
	$(window).scroll(function() {
		var scrollPos = $(window).scrollTop();
		var windowHeight =$(window).height();

		$('.scroll-animation').each(function() {
				var thisPos = $(this).offset().top;
				if((windowHeight + scrollPos)>= thisPos){
					$(this).addClass('fandIn-animation');
				}
		});	
	});

	$('.slideshow').each(function() {
		var $slides =$(this).find('img'),
			slideCount = $slides.length,
			currentIndex = 0;

		$slides.eq(currentIndex).fadeIn();

		setInterval(shownextimg,5000);

		function shownextimg () {
			var nextIndex = (currentIndex + 1) %slideCount ;

			$slides.eq(currentIndex).fadeOut();
			$slides.eq(nextIndex).fadeIn();

			currentIndex = nextIndex ;
		}
	});
});

