const path = require('path');
const fs = require('fs');
const Ticket = require('../models/ticket');

class TicketController {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];

    this.ticketsOnScreen = [];

    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      ticketsOnScreen: this.ticketsOnScreen,
    };
  }

  init() {
    const {
      today,
      tickets,
      last,
      ticketsOnScreen,
    } = require('../database/data.json');

    if (today === this.today) {
      this.tickets = tickets;
      this.last = last;
      this.ticketsOnScreen = ticketsOnScreen;
    } else {
      this.saveToDatabase();
    }
  }

  saveToDatabase() {
    const dbPath = path.join(__dirname, '../database/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  callNext() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveToDatabase();
    return ticket;
  }

  attendNext(cashier) {
    if (this.tickets.length === 0) {
      return null;
    }

    const ticket = this.tickets.shift();

    ticket.cashier = cashier;

    this.ticketsOnScreen.unshift(ticket);

    if (this.ticketsOnScreen.length > 4) {
      this.ticketsOnScreen.pop();
    }

    this.saveToDatabase();

    return ticket;
  }
}

module.exports = TicketController;
