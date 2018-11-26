<?php

$con = mysqli_connect("localhost", "root", "", "tracks");

$data = json_decode(file_get_contents("php://input"));

$id = mysqli_real_escape_string($con, $data->id);	
$title = mysqli_real_escape_string($con, $data->title);		
$query = "INSERT INTO `tracks`.`dz` (bool,`trackId`,`trackTitle`) 
		VALUES (0,'$id','$title');";
// Insertion des données dans la base de donées
mysqli_query($con, $query);
echo true;

?>