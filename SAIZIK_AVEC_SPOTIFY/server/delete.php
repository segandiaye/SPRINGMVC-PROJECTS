<?php

$con = mysqli_connect("localhost", "root", "", "tracks");

$data = json_decode(file_get_contents("php://input"));

$todo = mysqli_real_escape_string($con, $data->name);

$query = "DELETE FROM `tracks`.`task` WHERE `trackName`='$todo' LIMIT 1;";

mysqli_query($con, $query);
echo true;

?>
