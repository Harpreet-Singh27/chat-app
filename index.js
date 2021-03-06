var express = require('express');

var socket = require('socket.io');

var app = express();
var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, () => {
  console.log('listening to requests on port 5000');
});

//Static files
app.use(express.static('public'));

var io = socket(server);

io.on('connection', (socket) => {
  console.log('Made socket connection', socket.id);
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
