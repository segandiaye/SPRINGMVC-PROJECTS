<?php

$con = mysqli_connect("localhost", "root", "", "tracks");

$query = "SELECT * FROM dz";

$result = mysqli_query($con, $query);
$arr = array();
if(mysqli_num_rows($result) != 0) {
    while($row = mysqli_fetch_assoc($result)) {
    $arr[] = $row;
    }
}

//$json_info = "{ \"task\": ";
$json_info = json_encode($arr);
//$json_info .= "}";
echo $json_info;
 
?>