const TicketController = require('./ticket.controller');

const ticketController = new TicketController();

const socketController = (client) => {
  client.emit('last-ticket', ticketController.last);
  client.emit('current-status', ticketController.ticketsOnScreen);
  client.emit('queue-status', ticketController.tickets);

  client.on('next-ticket', (payload, callback) => {
    const next = ticketController.callNext();
    client.broadcast.emit('queue-status', ticketController.tickets);

    callback(next);
  });

  client.on('attend-ticket', (payload, callback) => {
    const cashier = payload;
    if (!cashier) {
      return callback({
        ok: false,
        msg: 'The cashier is required',
      });
    }

    const ticket = ticketController.attendNext(cashier);

    if (!ticket) {
      return callback({
        ok: false,
        msg: 'No more tickets',
      });
    }

    client.broadcast.emit('current-status', ticketController.ticketsOnScreen);
    client.emit('queue-status', ticketController.tickets);
    client.broadcast.emit('queue-status', ticketController.tickets);

    callback({
      ok: true,
      ticket,
    });
  });
};

module.exports = {
  socketController,
};
