$(document).ready(function() {
	$('.showmenu').on('click', function(e){
		e.preventDefault();
		$('body').toggleClass('menu-show');
	});


	$('#main-chief-button').click(function(event) {
		$('html,body').animate({scrollTop:$('#main-cheif').offset().top},800)
		$('body').toggleClass('menu-show')
	});
	$('#map-button').click(function(event) {
		$('html,body').animate({scrollTop:$('#mappoint').offset().top},800)
		$('body').toggleClass('menu-show')
	});
	$('.go-top').click(function(e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop:0
		},800);
	});
	$(window).scroll(function(event) {
		var scrollPos = $(window).scrollTop();
		if (scrollPos>440) {
			$('.go-top').fadeIn('slow/400/fast');
		}else {
			$('.go-top').fadeOut('slow/400/fast');
		}
	});

});

var map ;
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:22.6129271, lng:120.3025356},
          zoom: 15
        });
        var marker = new google.maps.Marker({
         position: { lat: 22.6127074 , lng:120.3042313 },
         map:map
        })
     }
