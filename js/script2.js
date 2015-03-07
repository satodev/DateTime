//variable
var startTimer = document.getElementById("startTimer");
var stopTimer = document.getElementById("stopTimer");
var xmlhttp = new XMLHttpRequest();
var array =[];
//object
var s = {
	timer:{
		getContent:function(){
			xmlhttp.onreadystatechange = function(){
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
				s.timer.parseTimer(xmlhttp.responseText);
					var sClock = document.getElementsByClassName("sClock");
					for(var i=0; i<sClock.length; i++){
						sClock[i].innerHTML = array[i];
					}
				}
			}
			xmlhttp.open("GET", "php/dateTime.php?q=refresh", true);	
			xmlhttp.send();
		},
		parseTimer:function(resTxt){
			array = resTxt.match(/([0-9]{2}:[0-9]{2}:[0-9]{2})/g);
		}
	},
	refresh:{
		int:function(){
			setInterval(s.timer.getContent,1000);
		}
	}
}
s.timer.getContent();
s.refresh.int();