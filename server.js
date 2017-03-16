// basic node server setup
var express  = require('express'),
    path     = require('path'),
    root     = __dirname,
    port     = process.env.PORT || 3001,
    app      = express();

var server = app.listen( port, function(){
  console.log(`server running on port ${ port }`);
});

var io = require('socket.io').listen(server);

// create an object to store viewer counts in
var viewers = {};

// Whenever a connection event happens run the following code
io.sockets.on('connection', function(socket){
  
  // prints a new socket connection in the terminal 
  console.log('new connection', socket.id);

  // updates viewer count when there is a new viewer
  socket.on("new_viewer", function(data){
    console.log('we have a new viewer', data);
    if(viewers[data.channel]){
      viewers[data.channel] += 1;
    }else{
      viewers[data.channel] = 1;
    }
  });

  // updates viewer count when a viewer leaves
  socket.on("leaving", function(data){
    console.log('someone left', data);
    if(viewers[data.channel]){
      viewers[data.channel] -= 1;
    }else{
      viewers[data.channel] = 0;
    }
  });

  // responds with the viewer count object
  socket.on("get_count", function(data){
    console.log(data);
    socket.emit("viewer_count", {viewers: viewers});
  });

  // when a user posts a chat comment broadcast to the chat
  socket.on("new_post", function(data){
    console.log('Someone submitted a message:', data);
    socket.broadcast.emit("broadcast", {response: data});
  });

  // when a channel owner deletes a chat comment broadcast to the chat
  socket.on("delete_post", function(data){
    console.log('Someone deleted a message', data);
    socket.broadcast.emit("delete", {response: data});
  });

});