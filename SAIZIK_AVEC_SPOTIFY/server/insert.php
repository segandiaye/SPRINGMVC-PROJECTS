<?php

$con = mysqli_connect("localhost", "root", "", "saizik");

$data = json_decode(file_get_contents("php://input"));

// $name = mysqli_real_escape_string($con, $data->name);	
// $artist = mysqli_real_escape_string($con, $data->artist);
// $duree = mysqli_real_escape_string($con, $data->duree);
// $album = mysqli_real_escape_string($con, $data->album);
// $dateAjout = mysqli_real_escape_string($con, $data->dateAjout);
// $uri = mysqli_real_escape_string($con, $data->trackUri);		
// $query = "INSERT INTO `tracks`.`task` (bool,`trackName`,`trackArtist`,`trackDuree`,`trackAlbum`,`trackDateAjout`,`trackUri`) 
		// VALUES (0,'$name','$artist','$duree','$album','$dateAjout','$uri');";
//// Insertion des données dans la base de donées
$trackArtiste = mysqli_real_escape_string($con, $data->trackArtiste);	
$trackGenre	 = mysqli_real_escape_string($con, $data->trackGenre);
$trackTitre	 = mysqli_real_escape_string($con, $data->trackTitre);
$trackName = mysqli_real_escape_string($con, $data->trackName);
$trackDuree = mysqli_real_escape_string($con, $data->$trackDuree);
$trackAlbum = mysqli_real_escape_string($con, $data->trackAlbum);
$trackFormat = mysqli_real_escape_string($con, $data->trackFormat);
$trackPhoto = mysqli_real_escape_string($con, $data->trackPhoto);
$trackRang = mysqli_real_escape_string($con, $data->trackRang);
$trackLecture = mysqli_real_escape_string($con, $data->trackLecture);
$trackNombrePlay = mysqli_real_escape_string($con, $data->trackNombrePlay);
$trackNotation = mysqli_real_escape_string($con, $data->trackNotation);
$trackEtat = mysqli_real_escape_string($con, $data->trackEtat);
$trackPlay = mysqli_real_escape_string($con, $data->trackUri);
$trackPoids = mysqli_real_escape_string($con, $data->trackPlay);
$trackSucces = mysqli_real_escape_string($con, $data->trackSucces);
$heurePlay = mysqli_real_escape_string($con, $data->trackUri);
// $trackId = mysqli_real_escape_string($con, $data->heurePlay);
$libraryId = mysqli_real_escape_string($con, $data->libraryId);
$trackPath = mysqli_real_escape_string($con, $data->trackPath);
	
$query = "
INSERT INTO `saizik`.`track` (
	`trackArtiste`,
	`trackGenre`,
	`trackTitre`,
	`trackName`,
	`trackDuree`,
	`trackAlbum`,
	`trackFormat`,
	`trackPhoto`,
	`trackRang`,
	`trackLecture`,
	`trackNombrePlay`,
	`trackNotation`,
	`trackEtat`,
	`trackPlay`,
	`trackPoids`,
	`trackSucces`,
	`heurePlay`,
	`trackId`,
	`libraryId`,
	`trackPath`
) VALUES (
	'$trackArtiste',	
	'$trackGenre',	
	'$trackTitre',	
	'$trackName',	
	'$trackDuree',	
	'$trackAlbum',	
	'$trackFormat',	
	'$trackPhoto',	
	'$trackRang',	
	'$trackLecture',	
	'$trackNombrePlay',	
	'$trackNotation',	
	'$trackEtat',	
	'$trackPlay',	
	'$trackPoids',	
	'$trackSucces',	
	'$heurePlay',	
	'$trackId',	
	'$libraryId',	
	'$trackPath'
);";

mysqli_query($con, $query);
echo true;

?>