<?php
class sDateTime{
	function singleOutputTimeZone($number){
		$time_id = DateTimeZone::listIdentifiers();
		date_default_timezone_set($time_id[$number]);
		//echo $time_id[$number]."<br/>";
		return $time_id[$number];
	}
	function singleOutputTime(){
		echo date("H:i:s");
	}
	function singleOuputDate(){
		echo date("d/m/Y")."<br/>";
	}
	function listOutputTimeZone(){
		$time_id = DateTimeZone::listIdentifiers();
		for($i=0;$i<sizeof($time_id); $i++){
			$array[] = $time_id[$i];
		}
		return $array;
	}
	function listOutputDate(){
		$time_id = DateTimeZone::listIdentifiers();
		for($i=0; $i<sizeof($time_id);$i++){
			date_default_timezone_set($time_id[$i]);
			$array[] = date("d/m/Y");
		}
		return $array;
	}
	function listOutputTime(){
		//$array= [];
		$time_id = DateTimeZone::listIdentifiers();
		for($i=0; $i<sizeof($time_id);$i++){
			date_default_timezone_set($time_id[$i]);
			$array[] = date("H:i:s");
			//echo date("H:i:s")."<br />";
		}
		return $array;
	}
	//View
	function VListOutputTime($container){
		echo "<div id=vlot-".$container.">";
		$elem = $this->listOutputTime();
		for($i=0;$i<sizeof($elem);$i++){
			echo '<div class="clock">';
			echo $elem[$i];
			echo '</div>';
		}
		echo "</div>";
	}
	function VListOuputDate($container){
		echo "<div id=vlod-".$container.">";
		$elem = $this->listOutputDate();
		for($i=0;$i<sizeof($elem);$i++){
			echo '<div class="date">';
			echo $elem[$i];
			echo '</div>';
		}
		echo "</div>";
	}
	function VListOutputTimeZone($container){
		echo "<div id=vlotz-".$container.">";
		$elem = $this->listOutputTimeZone();
		for($i=0;$i<sizeof($elem);$i++){
			echo '<div class="timeZone">';
			echo $elem[$i];
			echo '</div>';
		}
		echo "</div>";
	}
	function VListOuputGeneral(){
		$elem1 = $this->listOutputTimeZone();
		$elem2 = $this->listOutputDate();
		$elem3 = $this->listOutputTime();
		for($i=0;$i<sizeof($elem1);$i++){
			echo '<div class="timeZone">';
			echo '<div class="data">'.$elem1[$i]."<br/>".$elem2[$i]."<br/><div class='sClock'>".$elem3[$i]."</div></div>";
			echo "<canvas class='sCanvas'></canvas></div>";
		}
		echo "</div>";
	}
	//controllers
	function refreshFunction(){
		if(isset($_GET["q"])){
			$q = $_GET["q"];	
			if($q == "refresh"){
				//$this->VListOutputTime("container");
				echo json_encode($this->listOutputTime());
			}
		}
	}
}
$sdt1 = new sDateTime;
//$sdt->singleOutputTimeZone(1);
//$sdt->singleOuputDate();
//$sdt->singleOutputTime();
// $sdt->VListOutputTimeZone("container");
// $sdt->VListOuputDate("container");
// $sdt->VListOutputTime("container");
//$sdt->listOutputTime();
$sdt1->refreshFunction();
?>
