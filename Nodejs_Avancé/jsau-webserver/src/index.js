'use strict'

var http = require('http-server');
var express = require('express');
var app = express();
var fs = require('fs');
const morgan = require('morgan');
app.use(morgan('dev'));
var opener = require('opener');
app.set('view engine', 'ejs');
var path = require('path');

/***********FILE STATICS*****************************/
app.use('/', express.static(__dirname + '/resource/css'));
app.use('/', express.static(__dirname + '/resource/data'));
app.use('/', express.static(__dirname + '/resource/js'));
app.use('/', express.static(__dirname + '/resource/views'));
app.use('/', express.static(__dirname + '/resource/images'));

//**************APPEL DE L'API*****************************//
var apiRoutes = require('../../jsau-apiserver/api.js');
app.use('/api', apiRoutes);

/********************STYLE VARIABLE***********************/
var style={
  "style" : "style.css",
  "img" : "logo.jpg"
};

/***************MODULES EXPORTS***********************/
const my_shared_code_headless = require('./my_shared_code_headless');

let even_numbers = my_shared_code_headless.premiersNumbers(100)
//console.log('even_numbers:', even_numbers)

//let even_numbers = api.generateEvenNumbers(20);
//console.log('even_numbers:', even_numbers);

app.get('/browser', function (req, res) {
    res.sendFile(__dirname +'/resource/views/browser.html');
})
//*************LES NOMBRES PREMIERS DE 0 à 1000******************//
app.get('/', function (req, res) {
  var premiers = [];
  //  res.sendFile(__dirname +'/resource/views/premiers.html');
  res.render(path.join(__dirname + '/resource/views/premiers.ejs'),{premiers : even_numbers, style : style });
})

//*************/info*******************//
app.get('/info', function (req, res) {
})

//*************************LE SERVEUR*****************************///
var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  //opener('http://127.0.0.1:' + 8082);
  console.log("serveur démarré sur le port 8082")
});
