<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Authentification</title>
<style>
div{
background-color:silver;
border:3px solid highlight;
background-color:white;
position:absolute;
right:450px;
top:75px;
padding:10px 10px 10px 10px;
width:400px;
}
</style>
</head>
	<body>
	<h3>Page de connexion !</h3>
<div>
<form action="j_spring_security_check" method="post" >
<h3>Connexion</h3>
	<table>
		<tr>
			<td>Login</td>
			<td><input type="text" name="j_username"></td>
		</tr>
		<tr>
			<td>Pass word</td><td> 
			<input type="password" name="j_password"></td>
		</tr>
		<tr>
			<td><input type="submit" value="Login"></td>
		</tr>
	</table>
</form>

</div>
</body>
</html>