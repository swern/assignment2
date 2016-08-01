var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectID = mongodb.ObjectID;
var path = require('path');

app.use(bodyParser.json());
app.use(express.static('client/build'));
 
app.get("/", function(req,res){
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
    })

// app.post("/bucketlist", function(req,res){
//   MongoClient.connect(url, function(err, db){
//     var collection = db.collection('state');
//     collection.insert(req.body);
//     res.status(200).end();
//     db.close();
//   })
// })   

// app.get("/bucketlist", function(req,res){
//   MongoClient.connect(url, function(err, db){
//     var collection = db.collection('state');
//     collection.find({}).toArray(function(err, docs){
//       res.json(docs);
//       db.close();
//     })
//   })
// })


app.get("/airports/:lat/:lng", function(req,res){
  console.log(parseInt(req.params.lat));
  MongoClient.connect('mongodb://localhost:27017/airportsAPI', function(err, db){
    var collection = db.collection('airports');
    collection.find( 
    { 
      'lat': { '$gte': parseInt(req.params.lat) - 1, '$lte': parseInt(req.params.lat) + 1, '$ne': 0 }, 
      'lng': {'$gte': parseInt(req.params.lng) - 1, '$lte': parseInt(req.params.lng) + 1, '$ne': 0 } 
    } 
    ).toArray(function(err, docs){
      console.log(docs);
      res.json(docs);
      db.close();
    })
  })
})

//   app.delete("/bucketlist/:id", function(req,res){
//     MongoClient.connect(url, function(err, db){
//       var collection = db.collection('state');
//       collection.remove({_id: new ObjectID(req.params.id)})
//       res.status(200).end();
//       db.close();
//     })
//   })

app.listen('3000', function(){
  console.log("run run running on 3000");
})