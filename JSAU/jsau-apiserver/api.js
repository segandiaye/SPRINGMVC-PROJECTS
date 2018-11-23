var express = require('../jsau-webserver/node_modules/express');
var cors = require('../jsau-webserver/node_modules/cors');
var app = express();
var methodOverride = require('../jsau-webserver/node_modules/method-override');
var fs = require("fs");
var bodyParser = require('../jsau-webserver/node_modules/body-parser');
var path = require('../jsau-webserver/node_modules/path');
var appRouter = express.Router();
//*************TPERMET DE RECUPERER CE QU'ON TAPE SUR LES INPUTs*******************//
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(express.static(__dirname + '/'));
//*************INITIALISATION DE LA VARIABLE USER********************//
var user={
	"name" : "",
	"id": 0
};

//*************APPEL DES METHODS OVERRIDES (PUT, DELETE)********************//
app.use(methodOverride('_method'));

//**************CROSS ORIGIN*************************//
app.use(cors());
app.options('*', cors());

//*************TEST API AVEC LES METHODES OVERRIDES********************//
app.get('/testApi', function (req, res) {
    res.json({
        status: "success",
        message: "Api fonctionne très bien",
        methode : req.method
    });
})

//*************LISTER TOUTES LES MATIERES********************//
app.get('/listAll', function (req, res) {
   fs.readFile('./src/resource/data/data.json', 'utf8', function (err, data) {
       res.json({
           status: "success",
           message: "La liste de toutes les matières",
           data : JSON.parse(data),
           methode : req.method
       });
   });
})

//*************AJOUTER UNE MATIERE********************//
app.post('/add', urlencodedParser, function(req, res){
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
      data[inc] = user;
      var json = JSON.stringify(data);
      fs.writeFile('./src/resource/data/data.json', json, function(err) {
          if (err) throw err;
          res.json({
            status: "success",
            message : "Ajout d\'une nouvelle matière",
            data : data,
            methode : req.method
          });
      });
    });
})

//*************MODIFIER UNE MATIERE********************//
app.put('/update/:id', urlencodedParser, function(req, res){
    fs.readFile('./src/resource/data/data.json', 'utf8', function (err, data) {
      data = JSON.parse(data);
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
      var json = JSON.stringify(data);
      fs.writeFile('./src/resource/data/data.json', json, function(err) {
          if (err) throw err;
          res.json({
            status: "success",
            message : "Modification de la matière n°"+req.params.id+"éffectuée",
            data : data,
            methode : req.method
          });
      });
    });
})

//*************SUPPRIMER UNE MATIERE********************//
app.delete('/delete/:id', function (req, res) {
  fs.readFile('./src/resource/data/data.json', 'utf8', function (err, data) {
    data = JSON.parse(data);
    delete data[""+req.params.id];
		data.splice(data.indexOf(null),1) ;
    var json = JSON.stringify(data);
    fs.writeFile('./src/resource/data/data.json', json, function(err) {
        if (err) throw err;
        res.json({
          status: "success",
          message : "Suppression de lae matière n°",
          data : data,
          methode : req.method
        });
    });
  });
})

//************************EXPORTATION DES ROUTES*******************//
module.exports = app;

//*************TEXPORTATION DES ROUTES********************//

//*************TEST AVEC UN SERVEUR DE L'API********************//
/*
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("L\'application s\'execute sur 8081");
})*/
