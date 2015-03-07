document.onreadystatechange = function(){
	if(document.readyState == "complete"){
		//variables
		var pattern = /([0-9]{2}:[0-9]{2}:[0-9]{2}\n\r){419}/;
		var myVar;
		var result;
		var ctArray = [];
		var ct = document.getElementsByClassName("time");
		var canvasCont = document.getElementsByClassName("date");
		var st2 = document.getElementById("startTimer");
		var st = document.getElementById("stopTimer");
		//functions
		function getDateTime(){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
				}
			}
			xmlhttp.open("GET", "php/dateTime.php", true);
			xmlhttp.send();
		}
		function getContent(){
			var i=0;
			for(i;i<ct.length;i++){
				ctArray[i] = ct[i];
				contentTreatment(ctArray[i].innerHTML);
			}
		}
		function contentTreatment(arg){
			var str = arg;
			var reg = new RegExp(pattern);
			result = reg.exec(str).toString();
			recupCont(result[0], result[1],result[3],result[4],result[6],result[7])
			// return result[0]+result[1]+" "+result[3]+result[4]+" "+result[6]+result[7];
		}
		function recupCont(r1,r2,r3,r4,r5,r6){
			//console.log("gC : " +result[0]+result[1]+" "+result[3]+result[4]+" "+result[6]+result[7]);
		}
		function refreshPage(){
			getDateTime();
			getContent();
			recupCont();
		}
		function timerOn(){
		//	myVar = setInterval(refreshPage, 1000);
		}
		function timerOff(){
			clearInterval(myVar);
		}	
		st.onclick=function(){
			timerOff();
		}
		st2.onclick = function(){
			timerOn();
		}
		timerOn();
	}
}