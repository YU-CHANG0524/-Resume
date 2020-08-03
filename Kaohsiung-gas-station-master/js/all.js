var selectArea =document.getElementById('js-select');
var pointList = document.querySelector('.point-list');
var areaTitle = document.querySelector('.title-area');
var map;
var markers=[];
var defaultLoc = {lat: 22.6246947, lng:120.3012264} ;

selectArea.addEventListener('change',showResult,false);


//ajax 請求資料
var data ;
var xhr =new XMLHttpRequest();
xhr.open('get','https://raw.githubusercontent.com/YU-CHANG0524/test/master/gas-station.json',true);
xhr.send(null);

xhr.onload =function () {
	var alldata =JSON.parse(xhr.responseText);
	data =alldata ;
}

// 點擊觸發事件
function showResult (e) {
	//顯示出content部分
	$('.content').show();
	//載入地圖
	initMap(defaultLoc);

	var select = e.target.value ;
	var str='';
	var area='';
	var placeStr= {};
	var place= {};
	var image = 'https://github.com/YU-CHANG0524/test/blob/master/gas2.png?raw=true';
	var datalen = data.length;

	for (var i = 0; i < datalen; i++) {
		if (select == data[i].行政區) {
			place.lat = parseFloat(data[i].緯度Lat);
			place.lng = parseFloat(data[i].經度Lng);
	 	 	initMap(place);
		}

	}
	for (var i = 0; i < datalen; i++) {
		if (select == data[i].行政區) {
			str += '<li><ul class="li-style"><li>站  名:'+data[i].站名+'</li><li>營業主體 :'+data[i].營業主體+'</li><li>地址 :'+data[i].站址+'</li><li>電話 :'+data[i].電話號碼+'</li></ul></li>';
			area = data[i].行政區;
			place.lat = parseFloat(data[i].緯度Lat);
			place.lng = parseFloat(data[i].經度Lng);
			//標記篩選座標
			var marker = new google.maps.Marker({
	 	  	position : place,
	 	  	map:map,
	 	  	icon:image,
	 	  	title:data[i].站名
	 	 	})
		}
	}
	// checkLocation ();

	//更新網頁內容

	pointList.innerHTML = str ;
	areaTitle.innerHTML =area ;
	
	
	//下滑時，更改select 的位置
	jsContent = $('#js-content').offset().top;
	$('html,body').delay(650).animate({
	scrollTop: jsContent,},350
	);
	$(window).scroll(function(){
		var top = $(window).scrollTop();
		if(top>(jsContent-20)){
			$('.select').css({
				position: 'fixed',
				top: '0',
				left: '0',
				width: '100%',
				height: '70px',
				background: '#222'
			});
			$('#js-select').css({
				margin:'15px auto'
			})
		}else {
			$('.select').css({
				position: 'static',
				background: 'transparent'
			});
		}
		});
}

function initMap(value) {
	 	  map = new google.maps.Map(document.getElementById('map'), {
		  center:value,
		  zoom: 13
		  });
	}
// function checkLocation () {
// 		var infoWindow = new google.maps.InfoWindow({map: map});
// 		if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(function(position) {
//             var pos = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude
//             };

//             infoWindow.setPosition(pos);
//             infoWindow.setContent('您的現在位置');
//             map.setCenter(pos);
//           }, function() {
//             handleLocationError(true, infoWindow, map.getCenter());
//           });
//         } else {
//           // Browser doesn't support Geolocation
//           handleLocationError(false, infoWindow, map.getCenter());
//         }

// }