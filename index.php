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
		<a href="#" title="ON|OFF Timer" id="StartStopTimer">|</a>
		<a href="#" title="Go to top" id="goToTop">^</a>
		<input type="text" id="searchBar" title="English | dd/mm/yyyy | hh:mm:ss" placeholder="Search...">
		<div id="sbStatus"></div>
		<br />
	</div>
	<hr id="sep"/>
	<div id="txtHint">
		<?php $sdt->VListOuputGeneral();?>
	</div>
	<script src="js/dateTime.js"></script>
</body>
</html>

