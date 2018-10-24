var http = require('http-server');
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
//var opener = require('opener');
app.set('view engine', 'ejs');
var path = require('path');
var engines = require('consolidate');
app.engine('html', engines.mustache);

var urlencodedParser = bodyParser.urlencoded({ extended: true });
var isData=true;
var isDataReady=false;
var donnee=[
	{
		"name" : "",
		"password" : "",
		"profession" : "",
		"id": 0
	}
];
var user={
	"name" : "",
	"password" : "",
	"profession" : "",
	"id": 0
};
var users=[];
var smsModif='';
var html='';
var isEit=false;
var edit=false;
var color='';
//app.set('view engine', 'html');

function returData(){
	  html += "<body>";
	  html += "<div style='text-align:center;color:black solid 10px;font-size:25px'><p>Notre premier TP de JS avancée</p></div>";
	  html += "<div style='text-align:center;'><p>Matières PLS</p></div>";
	  html += "<div style='text-align:center'>";
	  html += "<form action='/sucess'  method='post' name='form1'>";
	  html += "Matière : <input type= 'text' name='name'>";
	  html += "<br/>";
	  html += "<br/>";
	  html += "<INPUT type='reset'  value='réinitialiser'>";
	  html += "<br/>";
	  html += "<br/>";
	  html += "<INPUT type='submit'  value='Ajouter une matière'>";
	  html += "<br/>";
	  html += "<br/>";
	  
	  for(var i=0;i<donnee.length;i++){
		  if(donnee[0].name!=''){
			  html += "<a href='<%= donnee[i].id %>'>"+donnee[i].name+"</a>"+" "+"<a href='#'>supprimer</a><br/>";
		  }
	  };
	  html += "</form>";
	  html += "</div>";
	  html += "</body>";
	  
	  return html;
	};

/*****************************ACCUEIL**************************************/	
app.get('/', function (req, res) {
 users=[];
 //isEit=false;
  //console.log("La donnee est ",req.query.name);
  fs.readFile('../../src/data/data.json', 'utf8', function readFiles(err, data){
		if (err) throw err;
		isDataReady=true;
		obj = JSON.parse(data);
		donnee=obj;
		//returData();
		//res.send(html);
		res.render(path.join(__dirname + '/index.ejs'),{users:donnee, user : user, smsModif : smsModif, color : color, edit : edit});
  });
  
  
  if(isDataReady==true){
	  
  };
});

app.post('/sucess/:id', urlencodedParser, function (req, res){
  users=[];
  color='';
  //isEit=false;
  //smsModif='';
  var pos=0;
  var reply='';
  reply += "La matière ajoutée avec succès.";
  //+ req.body.name
  
    fs.readFile('../../src/data/data.json', 'utf8', function readFileCallback(err, data){
		
		if (err){
			console.log(err);
		} else {
		obj = JSON.parse(data);
		var inc=0;
		if(obj.length>0){
			inc=obj[obj.length-1].id + 1;
		}
		user={
		  "name" : ""+req.body.name,
		  "password" : "password"+inc,
		  "profession" : "Student"+inc,
		  "id": inc
	    };
		/*
		for(var j=0;j<obj.length;j++){
			if(req.body.name===obj[j].name&&obj[pos].name!=''){
				color='color:red';
				smsModif='Ce nom existe dèjà.';
				isEit=true;
				break;
			};
			if(req.body.id==obj[j].id){
				pos=j;
			};
		};
		if(!isEit&&obj.length!=0&&edit){
			obj[pos].name=req.body.name;
			color='color:green';
			smsModif='Modification éffectuée.';
			edit=false;
		};
		if(color===''&&!edit){
			obj.push(user);
		}*/
		for(var j=0;j<obj.length;j++){
			if(req.body.name===obj[j].name){
				break;
			};
			if(req.params.id==obj[j].id){
				pos=j;
			};
		};
		if(edit){
			obj[pos].name=req.body.name;
			color='color:green';
			smsModif='Modification éffectuée.';
			edit=false;
		}else{
			color='color:green';
			smsModif='Opération éffectuée.';
			obj.push(user);
		};
		
		json = JSON.stringify(obj);
		fs.writeFile('../../src/data/data.json', json, function(err) {
			if (err) throw err;
			res.render(path.join(__dirname + '/index.ejs'),{users:obj, user : user, smsModif : smsModif, color : color, edit : edit});		
		});
		
		/*fs.writeFile('../../src/data/data.json', json, { flag: 'a+' }, function(err) {
			if (err) throw err;
				console.log('Insertion avec succès');
			}
		);*/
		/*
		fs.appendFile('../../src/data/data.json',json, function(err){
			if(err){console.log(err)}
			console.log('Insertion avec succès');
		});*/
	}});
});

/*****************************EDITION**************************************/
app.get('/detail/:name/:id', function (req, res) {
	users=[];
	//smsModif='';
	color='';
	edit=true;
	//isEit=false;
   fs.readFile('../../src/data/data.json', 'utf8', function (err, data) {
      var data = JSON.parse(data);
	  var user=[];
	  for(var i=0;i<data.length;i++){
		  if(data[i].id==req.params.id){
			user = data[i] ;
		  }
	  };
	  //res.render('index',{user:"John Smith"}) ;
	   res.render(path.join(__dirname + '/index.ejs'),{users : data, user : user, smsModif : smsModif, color : color, edit : edit});
	   //res.sendFile(path.join(__dirname + '/index.ejs'),{user:"John Smith"});
      //res.end( JSON.stringify(user));
   });
});


/*****************************SUPPRESSION**************************************/
app.get('/supression/:id', function (req, res) {
	users=[];
	color='';
	//edit=false;
	//smsModif='';
	//isEit=false;
   fs.readFile( '../../src/data/data.json', 'utf8', function (err, data) {
       data = JSON.parse( data );
      // delete data["user" + 3];
        for(var i=0;i<data.length;i++){
		  if(data[i].id==req.params.id){
			data.splice(i,1) ;
		  }
	    };
		res.render(path.join(__dirname + '/index.ejs'),{users:data, user : user, smsModif : smsModif, color : color, edit : edit});
		json = JSON.stringify(data);
		fs.writeFile('../../src/data/data.json', json, function(err) {
			if (err) throw err;
		});
       //res.render(path.join(__dirname + '/index.ejs'),{users:data});
   });
});

/*
app.delete('/delete', function (req, res) {
   fs.readFile( __dirname + "/" + "data.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 3];
       res.end( JSON.stringify(data));
   });
});*/

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  //opener('http://localhost:' + 8080);
  console.log("serveur démarré sur le port 8080")
});