//variable
var stat = document.getElementById("status");
var startTimer = document.getElementById("startTimer");
var stopTimer = document.getElementById("stopTimer");
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
	dataManager:{
		getData:function(data,callback){
			callback(data);
		}
	},
	events:{
		eventTriggers:function(){
			startTimer.onclick = function(){
				s.refresh.start();
			}
			stopTimer.onclick=function(){
				s.refresh.stop();
			}
		}
	},
	timer:{
		getPhp:function(){
			xmlhttp.onreadystatechange = function(){
				if(xmlhttp.readyState != 4 && xmlhttp.status != 200){
					
				}
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					//s.dataManager.getData(xmlhttp.responseText,s.canvas.getHours);
					s.timer.displayClock(xmlhttp.responseText);
				}
			}
			xmlhttp.open("GET", "php/dateTime.php?q=refresh", true);	
			xmlhttp.send();
		},
		parseTimer:function(i){
			var time =/([0-9]{2}):([0-9]{2}):([0-9]{2})/;
			var string = array[i].toString();
			sectionTime = time.exec(string);
		},
		displayClock:function(resTxt){
			array = resTxt.match(/([0-9]{2}:[0-9]{2}:[0-9]{2})/g);
			for(var i=0; i<sClock.length; i++){
				sClock[i].innerHTML = array[i];
				s.timer.parseTimer(i);
				ctCanvas = sCanvas[i].getContext("2d");
				s.canvas.genCtCanvas(i);
			}	
		}
	},
	refresh:{
		start:function(){
			stat.innerHTML = "Timer ON";
			startInterval = setInterval(s.timer.getPhp,1000);
		},
		stop:function(){
			stat.innerHTML = "Timer OFF";
			clearInterval(startInterval);
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
			sCanvas[i].width = window.innerWidth/8;
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
			for (var i=0;i<60;i++){
				ctCanvas.beginPath();
				ctCanvas.rotate(Math.PI/30);
				ctCanvas.moveTo(swidth/4,0);
				if(i==59||i==14||i==29||i==44){
					ctCanvas.strokeStyle="#FF0000";
					ctCanvas.lineTo(swidth/4.7,0);
				}else{
					ctCanvas.strokeStyle="#000000";
					ctCanvas.lineTo(swidth/4.7,0);
				}
				ctCanvas.stroke();
			}
			ctCanvas.restore();
		},
		defineCenter:function(i,swidth,sheight){
			ctCanvas.save();
			ctCanvas.strokeStyle="#FF0000";
			ctCanvas.translate(swidth/2,sheight/2);
			ctCanvas.moveTo(0,0);
			ctCanvas.lineTo(5,0);
			ctCanvas.moveTo(0,0);
			ctCanvas.lineTo(0,5);
			ctCanvas.moveTo(0,0);
			ctCanvas.lineTo(-5,0);
			ctCanvas.moveTo(0,0);
			ctCanvas.lineTo(0,-5);
			ctCanvas.stroke();
			ctCanvas.restore();
		},
		drawSeconds:function(i,swidth,sheight){
			ctCanvas.save();
			ctCanvas.translate(swidth/2,sheight/2);
			ctCanvas.rotate(-90*Math.PI/180);
			ctCanvas.rotate(sectionTime[3]*Math.PI/30);
			ctCanvas.moveTo(0,0);
			ctCanvas.strokeStyle="#F00";
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