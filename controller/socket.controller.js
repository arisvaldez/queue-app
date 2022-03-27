const socketController = (client) => {
  console.log('client connected', client.id);

  client.on('disconnect', () => {
    console.log('client disconnected', client.id);
  });

  client.on('send-message', (message, callback) => {
    console.log(message);
    callback(message);
    client.broadcast.emit('response', 'Response from server');
  });
};

module.exports = {
  socketController,
};
