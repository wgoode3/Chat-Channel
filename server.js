var express  = require('express'),
    path     = require('path'),
    root     = __dirname,
    port     = process.env.PORT || 3001,
    app      = express();

var server = app.listen( port, function(){
  console.log(`server running on port ${ port }`);
});

var io = require('socket.io').listen(server);

// Whenever a connection event happens run the following code
io.sockets.on('connection', function(socket){
  console.log(socket.id);

  socket.on("new_post", function(data){
    console.log('Someone submitted a message:', data);
    socket.broadcast.emit("broadcast", {response: data});
  })

  socket.on("delete_post", function(data){
    console.log('Someone deleted a message', data);
    socket.broadcast.emit("delete", {response: data});
  })
})