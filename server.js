var io = require('socket.io')();

io.on('connection', (socket) => {
  console.log('WE are insinde connection')
  socket.on('peer-msg', (data) => {
    console.log('Message from peer: %s', data);
    socket.broadcast.emit('peer-msg', data);
  })

  // socket.on('go-private', (data) => {
  //   socket.broadcast.emit('go-private', data);
  // });

  socket.on("send message", function(data){
    console.log("message has been SENT!!! AND THAT MESSAGE IS:", data)
    io.sockets.emit("new message", data)
  })

  socket.on("start button", function(data){
    console.log("message has been SENT!!! AND THAT MESSAGE IS:", data)
    io.sockets.emit("startFeed", data)
    console.log("io sockets has been emitted!!!")
  })

});

module.exports = io;
