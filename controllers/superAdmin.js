'use strict';


var express = require('express');
var http = require('http');
var socket = require('socket.io');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cors = require('cors')
var SuperAdmin = require('../models/superAdmin');
var Socket = require('../models/socket');
//var SuperAdminController = require('./superAdmin');
var UserTask = require('../models/userTask');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var cryptoHandler = ('../controllers/cryptoHandler');
app.use(cors())
router.use(cors())
//var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var jsonwebtoken = require('jsonwebtoken');
//var User = mongoose.model('User');
var server = require('../app.js');

app.use(cors())
router.use(cors())



//support on x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




// setting the socket.io up


var io = socket(server);
io.on('connection', function(socket) {

    console.log('made socket connection', socket.id);

  


    // Handle chat event
    socket.on('chat', function(data){
         console.log(data);
        io.sockets.emit('chat', data);
    });

  });

  exports.sendNotification = function(req, res){
    console.log('sending the message ');
    
  Socket.findOne({'socketId': req.body.socketId})
  .exec(function(err, socketId){
    if(err){
      console.log('.........error occured........')
      console.log(err);
    }else{
      if(socketId !== null){
        console.log('failed socketId is already exist');

      }else{
         var socket = new Socket();
         socket.socketId = socket.id

         socket.save(function(err){
           if(err){
             console.log('error occured');
             console.log(err);
           }else{
             res.json({message: 'success', details: 'socket registered', content: socket.id});
           }
         })

      }
    }
  })  

  }