let io;

function setupSocket(server) {
  const socketIo = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io = socketIo;

  io.on('connection', (socket) => {
    console.log('⚡ A user connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('👋 A user disconnected:', socket.id);
    });
  });
}

function emitNotification(event, data) {
  if (io) {
    io.emit(event, data);
  }
}

module.exports = {
  setupSocket,
  emitNotification,
};
