var express = require('express');
var socket = require('socket.io');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; 
// App setup
var app = express();
var dbe = 'mongodb://localhost/new';

mongoose.connect(dbe);
// mongoose.connect(uri);
mongoose.connection.once('open', function(){
  console.log('connection has made');
}).on('error', function(error){
  console.log('connection error', error);
})


var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', function(socket) {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
         console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});