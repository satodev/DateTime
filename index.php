<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>
		DateTime
		<?php 
		include("php/dateTime.php");
		$sdt = new sDateTime();
		// $sdt->singleOutputTimeZone("345"); 
		// $sdt->singleOutputTime();
		?>
	</title>
	<link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico">
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<div id="body">
		<div id="title"><a href="/DateTime">DateTime</a></div>
		<a href="#" id="StartStopTimer">|</a>
		<div id="status"></div>
		<br />
		<canvas id="canvas"></canvas>
	</div>
	<div id="txtHint">
		<?php $sdt->VListOuputGeneral();?>
	</div>
	<script src="js/dateTime.js"></script>
</body>
</html>

