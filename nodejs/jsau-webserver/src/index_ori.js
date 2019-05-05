'use strict'

var http = require('http-server');
var express = require('express');
var cors = require('cors');
var app = express();
var methodOverride = require('method-override');
var fs = require('fs');
const morgan = require('morgan');
app.use(morgan('dev'));
var bodyParser = require('body-parser');
var opener = require('opener');
app.set('view engine', 'ejs');
var path = require('path');
var opener = require('opener');
//***********JQUERRY***********///
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require('jquery')(window);

var urlencodedParser = bodyParser.urlencoded({ extended: true });

//app.use(express.static('/resources/css/'));
app.use('/', express.static(__dirname + '/resource/css'));
app.use('/', express.static(__dirname + '/resource/js'));
app.use('/', express.static(__dirname + '/resource/images'));

//*************APPEL DES METHODS OVERRIDES (PUT, DELETE)********************//
app.use(methodOverride('_method'));

//**************CROSS ORIGIN*************************//
app.use(cors());
app.options('*', cors());
//**************FIN CROSS ORIGIN*************************//

var isData=true;
var isDataReady=false;
var users=[
	{
		"name" : "",
		"id": 0
	}
];
var user={
	"name" : "",
	"id": 0
};
var smsModif='';
var html='';
var isEit=false;
var edit=false;
var color='';
var style={
  "style" : "style.css",
  "img" : "logo.jpg"
};
/****************TESTS MODULES***********************************/
const my_shared_code_headless = require('./my_shared_code_headless');

let even_numbers = my_shared_code_headless.premiersNumbers(100);
//console.log('even_numbers:', even_numbers);

//*************AFORMULAIRE DE TEST DES METHODES OVERRIDES********************//
app.get('/', function (req, res) {
  var premiers = [];
  //  res.sendFile(__dirname +'/resource/views/premiers.html');
  res.render(path.join(__dirname + '/resource/views/premiers.ejs'),{premiers : even_numbers, style : style });
})

//*************/info*******************//
app.get('/info', function (req, res) {
})

/*****************************ACCUEIL**************************************/
app.get('/accueil', function (req, res) {
  edit=false;
  color='';
  smsModif='';
  fs.readFile('./src/resource/data/data.json', 'utf8', function readFiles(err, data){
		if (err) throw err;
		isDataReady=true;
		var obj = JSON.parse(data);
		res.render(path.join(__dirname + '/resource/views/index.ejs'),{users:obj, user : user, smsModif : smsModif, color : color, edit : edit, style : style});
  });
});

//************************AJOUTER*****************************//
app.post('/add', urlencodedParser, function (req, res){
  users=[];
  color='';
  fs.readFile('./src/resource/data/data.json', 'utf8', function (err, data) {
    var data = JSON.parse(data);
    var inc=0;
    if(data.length>0){
      inc=data[data.length-1].id + 1;
    };
    user={
       "name" : ""+req.body.name,
       "id": inc
    };
    data.push(user);
    //data[inc] = user;
    var json = JSON.stringify(data);
    color='color:green';
    smsModif='Opération éffectuée.';
     fs.writeFile('./src/resource/data/data.json', json, function(err) {
        if (err) throw err;
        res.render(path.join(__dirname + '/resource/views/index.ejs'),{users:data, user : user, smsModif : smsModif, color : color, edit : edit, style : style});
      });
   });
});

/*****************************EDITION**************************************/
app.get('/detail/:id', function (req, res) {
	users=[];
	color='';
	edit=true;
  color='';
  smsModif='';
  fs.readFile('./src/resource/data/data.json', 'utf8', function (err, data) {
    var data = JSON.parse(data);
	  var user=[];
	  for(var i=0;i<data.length;i++){
		  if(data[i].id==req.params.id){
				user = data[i] ;
		  }
	  };
	   res.render(path.join(__dirname + '/resource/views/index.ejs'),{users : data, user : user, smsModif : smsModif, color : color, edit : edit, style : style});
   });
});

/*****************************MODIFICATION**************************************/
app.put('/update/:id', urlencodedParser, function (req, res) {
	 users=[];
	 color='';
   fs.readFile('./src/resource/data/data.json', 'utf8', function (err, data) {
     var data = JSON.parse(data);
     const requestId = req.params.id;

     let user_ = data.filter(user_ => {
      return user_.id==requestId;
     })[0];

     const index = data.indexOf(user_);

     const keys = Object.keys(req.body);

     keys.forEach(key => {
       user_[key] = req.body[key];
     });
     data[index] = user_;
     color='color:green';
     smsModif='Modification éffectuée.';
     user=data[index];
     var json = JSON.stringify(data);
     fs.writeFile('./src/resource/data/data.json', json, function(err) {
         if (err) throw err;
         edit=false;
    	   res.render(path.join(__dirname + '/resource/views/index.ejs'),{users : data, user : user, smsModif : smsModif, color : color, edit : edit, style : style});
     });
   });
});

/*****************************SUPPRESSION**************************************/
app.delete('/delete/:id', function (req, res) {
	users=[];
	color='';
  edit=false;
  fs.readFile('./src/resource/data/data.json', 'utf8', function (err, data) {
     data = JSON.parse(data);
     delete data[""+req.params.id];
     data.splice(data.indexOf(null),1) ;
     var json = JSON.stringify(data);
     fs.writeFile('./src/resource/data/data.json', json, function(err) {
         if (err) throw err;
         color='color:green';
         smsModif='Opération éffectuée.';
         res.render(path.join(__dirname + '/resource/views/index.ejs'),{users:data, user : user, smsModif : smsModif, color : color, edit : edit, style : style});
     });
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
  //opener('http://127.0.0.1:' + 8080);
  console.log("serveur démarré sur le port 8080")
});
