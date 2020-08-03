var recordlist =document.querySelector('.recordlist');
var result =document.querySelector('.result');
var data =JSON.parse(localStorage.getItem('BMIrecord')) ||[];
var resultdiv =document.querySelector('.resultdiv');
var deletButton =document.querySelector('.deletButton');

var statusData =[{
		'status':'過輕',
		'buttonStyle':'light',
		'buttonBackground':'lightbg',
		'recordBorder':'lightBorder'
		},
		{
		'status':'理想',
		'buttonStyle':'normal',
		'buttonBackground':'normalbg',
		'recordBorder':'normalBorder'
		},
		{
		'status':'過重',
		'buttonStyle':'heavy',
		'buttonBackground':'heavybg',
		'recordBorder':'heavyBorder'
		},
		{
		'status':'輕度肥胖',
		'buttonStyle':'tooheavy',
		'buttonBackground':'tooheavybg',
		'recordBorder':'tooheavyBorder'
		},
		{
		'status':'中度肥胖',
		'buttonStyle':'mildlyFat',
		'buttonBackground':'mildlyFatbg',
		'recordBorder':'mildlyFatBorder'
		},
		{
		'status':'重度肥胖',
		'buttonStyle':'severeFat',
		'buttonBackground':'severeFatbg',
		'recordBorder':'severeFatBorder'
		},

]

//日期
var date =new Date();
var y = date.getFullYear() , m =date.getMonth()+1 , d =date.getDate();
var time =(m+'-'+d+'-'+y);

result.addEventListener('click', addrecord,false);
deletButton.addEventListener('click',deletRecord,false);
updateWeb(data);



//將資料存到localstorge和data
function addrecord (e) {
	e.preventDefault();
	
	var cm =document.querySelector('.cm').value;
	var kg =document.querySelector('.kg').value;
	var count = Math.round(kg/((cm/100)*(cm/100))*100)/100 ;
	

	//漏填資料提示
	if (cm =='' || kg=='') {
		alert('!!請輸入完整的資料!!');
	}
	//判斷狀態並將值存到status
	function  addstatus(count) {
		var result ='';
		if (count<18.5) {
			   result ='過輕' ;
		}else if (18.5<count  && count<=24) {
			  result ='理想';
		}else if (24<count  && count<=28) {
			  result ='過重';
		}else if (28<count  && count<=30) {
			  result ='輕度肥胖';
		}else if (30<count  && count<=35) {
			  result ='中度肥胖';
		}else if (35<count) {
			  result ='重度肥胖';
		}	
		return result ;
	}
 	var status =  addstatus(count) ;
	
	var record = {
		BMIrecord :count ,Weight :kg ,Height :cm , Value:status
	};


	for (var i = 0; i < statusData.length; i++) {
		if (status == statusData[i].status ) {
			resultdiv.innerHTML = '<div class="buttonstyle '+statusData[i].buttonStyle+' "><span class="bmivalue">'+record.BMIrecord+'</span><em class="bmi">BMI</em><span class="BMIstatus">'+record.Value+'</span><a class="reset '+statusData[i].buttonBackground+' " href=""><img src="images/icons_loop.png" alt=""></a></div>';		
			break;
		}
	}
	data.push(record);
	updateWeb(data);
	localStorage.setItem('BMIrecord',JSON.stringify(data));
}

function updateWeb (item) {
	var str ='';
	for (var i = 0; i <item.length; i++) {
		for( var j=0 ; j<statusData.length ; j++ ){
			if (item[i].Value == statusData[j].status) {
			str +='<li class=" '+statusData[j].recordBorder+' "><ul class="information"><li class="bodyResult"><em>'+item[i].Value+'</em></li><li>BMI<em>'+item[i].BMIrecord+'</em></li><li>weight<em>'+item[i].Weight+'kg</em></li><li>height<em>'+item[i].Height+'cm</em></li><li class="recordtime">'+time+'</li></ul></li>'
		    }
	recordlist.innerHTML =str ; 
         }
     }
}

//清除紀錄
function deletRecord () {
	localStorage.clear();
	updateWeb(data);
}