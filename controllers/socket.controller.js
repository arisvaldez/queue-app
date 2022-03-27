const TicketController = require('./ticket.controller');

const ticketController = new TicketController();

const socketController = (client) => {
  client.emit('last-ticket', ticketController.last);

  client.on('next-ticket', (message, callback) => {
    const next = ticketController.callNext();
    callback(next);
  });
};

module.exports = {
  socketController,
};
