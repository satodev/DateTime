//variable
var stat = document.getElementById("status");
var toggleTimer = document.getElementById("StartStopTimer");
var sb = document.getElementById("searchBar");
var sbstatus = document.getElementById("sbStatus");
var goToTop = document.getElementById("goToTop");
var sClock = document.getElementsByClassName("sClock");
var sCanvas = document.getElementsByClassName("sCanvas");
var txtHint = document.getElementById("txtHint");
var xmlhttp = new XMLHttpRequest();
var array = [];
var sectionTime = [];
var ctCanvas;
var startInterval;
var Etrigger;
//object
var s = {
	init:function(){
		s.timer.getPhp();
		s.events.eventTriggers();
		s.refresh.start();
		//s.canvas.getHours();
	},
	cs:function(thing){
		try{
			console.log(thing);
		}catch(err){
			console.log(err);
		}
	},
	events:{
		eventTriggers:function(){
			toggleTimer.onclick = function(event){
				event.preventDefault();
				if(Etrigger == false){
					s.refresh.start();
				}else{
					s.refresh.stop();
				}
			},
			goToTop.onclick = function(event){
				event.preventDefault();
				s.utility.scrollToTop(900);
			},
			sb.onkeyup = function(event){
				s.utility.filter(sb.value);
			}
		}
	},
	timer:{
		getPhp:function(){
			xmlhttp.onreadystatechange = function(){
				if(xmlhttp.readyState != 4 && xmlhttp.status != 200){
				}
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					s.timer.displayClock(xmlhttp.responseText);
				}
			}
			xmlhttp.open("GET", "php/dateTime.php?q=refresh", true);	
			xmlhttp.send();
		},
		displayClock:function(resTxt){
			array = resTxt.match(/([0-9]{2}:[0-9]{2}:[0-9]{2})/g);
			for(var i=0; i<sClock.length; i++){
				sClock[i].innerHTML = array[i];
				s.timer.parseTimer(i);
				ctCanvas = sCanvas[i].getContext("2d");
				s.canvas.genCtCanvas(i);
			}	
		},
		parseTimer:function(i){
			var time =/([0-9]{2}):([0-9]{2}):([0-9]{2})/;
			var string = array[i].toString();
			sectionTime = time.exec(string);
		}
	},
	refresh:{
		start:function(){
			toggleTimer.innerHTML="|";
			window.Etrigger = true;
			startInterval = setInterval(s.timer.getPhp,1000);
		},
		stop:function(){
			toggleTimer.innerHTML="Ø";
			window.Etrigger = false;
			clearInterval(startInterval);
		}
	},
	utility:{
		scrollToTop:function(scrollDuration) {
			var scrollStep = -window.scrollY / (scrollDuration / 15),
			scrollInterval = setInterval(function(){
				if ( window.scrollY != 0 ) {
					window.scrollBy( 0, scrollStep );
				}
				else clearInterval(scrollInterval); 
			},15);
		},
		filter:function(value){
			var tz = document.getElementsByClassName("timeZone");
			try{
				for(var i=0; i<tz.length;i++){
					var reg = new RegExp(value,"g");
					var res = reg.exec(tz[i].childNodes[0].textContent);
					tz[i].style.display = "none";
					sbstatus.innerHTML="";
					if(res && res.input == tz[i].childNodes[0].textContent){
						tz[i].style.display ="block";
					}else if(!value){
						tz[i].style.display="block";
					}
				}
			}catch(err){
				//console.log(err);
				sbstatus.innerHTML = "Don't even think about it";
			}
		}
	},
	canvas:{
		genCtCanvas:function(i){
			//want clock here 
			var swidth = sCanvas[i].width;
			var sheight = sCanvas[i].height;
			/*var hour = s.canvas.getHours(sectionTime[1]);
			var min = s.canvas.getMinutes(sectionTime[2]);
			var sec = s.canvas.getSeconds(sectionTime[3]);*/
			s.canvas.defineCanvas(i);
			s.canvas.drawCircle(i,swidth,sheight);
			s.canvas.drawtimeSpace(i,swidth,sheight);
			s.canvas.defineCenter(i,swidth,sheight);
			s.canvas.drawSeconds(i,swidth,sheight);
			s.canvas.drawMinutes(i,swidth,sheight);
			s.canvas.drawHours(i,swidth,sheight);
		},
		defineCanvas:function(i){
			sCanvas[i].height = 200;
			sCanvas[i].width = window.innerWidth/6;
		},
		drawCircle:function(i,swidth,sheight){
			ctCanvas.save();
			ctCanvas.translate(swidth/2,sheight/2);
			ctCanvas.arc(0,0,swidth/4,0,180);
			ctCanvas.stroke();
			ctCanvas.restore();
		},
		drawtimeSpace:function(i,swidth,sheight){
			ctCanvas.save();
			ctCanvas.translate(swidth/2,sheight/2);
			for(var i=0;i<=60;i++){
				ctCanvas.beginPath();
				ctCanvas.rotate(Math.PI/30);
				ctCanvas.moveTo(swidth/4,0);
				if(i==59||i==14||i==29||i==44){
					ctCanvas.strokeStyle="#FF0000";
					ctCanvas.lineTo(swidth/4.7,0);
				}else{
					ctCanvas.strokeStyle="#6b2aff";
					ctCanvas.lineTo(swidth/4.7,0);
				}
				ctCanvas.stroke();
				ctCanvas.fill();
			}
			ctCanvas.restore();
		},
		defineCenter:function(i,swidth,sheight){
			ctCanvas.save();
			ctCanvas.translate(swidth/2,sheight/2);
			ctCanvas.moveTo(0,0);
			ctCanvas.strokeStyle="";
			ctCanvas.arc(0,0,2,0,Math.PI*2);
			ctCanvas.fill();
			ctCanvas.restore();
		},
		drawSeconds:function(i,swidth,sheight){
			ctCanvas.save();
			ctCanvas.translate(swidth/2,sheight/2);
			ctCanvas.rotate(-90*Math.PI/180);
			ctCanvas.rotate(sectionTime[3]*Math.PI/30);
			ctCanvas.moveTo(0,0);
			ctCanvas.strokeStyle="#000";
			ctCanvas.lineWidth = 1;
			ctCanvas.lineTo(swidth/5,0);
			ctCanvas.stroke();
			ctCanvas.restore();
		},
		drawMinutes:function(i,swidth,sheight){
			ctCanvas.save();
			ctCanvas.translate(swidth/2,sheight/2);
			ctCanvas.rotate(-90*Math.PI/180);
			ctCanvas.rotate(sectionTime[2]*Math.PI/30);
			ctCanvas.moveTo(0,0);
			ctCanvas.strokeStyle="#000";
			ctCanvas.lineWidth = 2;
			ctCanvas.lineTo(swidth/6,0);
			ctCanvas.stroke();
			ctCanvas.restore();
		},
		drawHours:function(i,swidth,sheight){
			ctCanvas.save();
			ctCanvas.translate(swidth/2,sheight/2);
			ctCanvas.rotate(-90*Math.PI/180);
			ctCanvas.rotate(sectionTime[1]*Math.PI/6);
			ctCanvas.moveTo(0,0);
			ctCanvas.lineWidth = 2;
			ctCanvas.strokeStyle="#000";
			ctCanvas.lineTo(swidth/8,0);
			ctCanvas.stroke();
			ctCanvas.restore();
		},
	},
}
s.init();