<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>
		DateTime - 
		<?php date_default_timezone_set("Europe/Paris"); echo date("H:i:s");?>
	</title>
	<link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico">
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<div id="body">
		<div id="title"><a href="/DateTime">DateTime</a></div>
		<a href="#" id="startTimer"></a>
		<a href="#" id="stopTimer"></a>
		<br />
	</div>
	<div id="txtHint">
		<?php include("php/dateTime.php");
		$sdt = new sDateTime();
		$sdt->VListOuputGeneral();
		$sdt1->refreshFunction();
		?>
	</div>
	<!--<script src="js/script.js"></script>-->
	<script src="js/script2.js"></script>
</body>
</html>

