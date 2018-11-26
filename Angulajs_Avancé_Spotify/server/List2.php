<?php 
	$base = mysql_connect ('localhost', 'root', '');  
	mysql_select_db ('tracks', $base) ;  
	$sql = "SELECT* FROM task";  
	$req = mysql_query($sql) or die('Erreur SQL !<br />'.$sql.'<br />'.mysql_error());  
	$nb_sujets = mysql_num_rows ($req);   
	if ($nb_sujets == 0) 
	{ 
		echo '<h2 align="center">Aucun sujet </h2>'; 
	}  
	else { 
		while ($data = mysql_fetch_array($req)) 
		{ 
			echo  $data['trackName'];
		} 
	}
    mysql_free_result ($req);  
?> 