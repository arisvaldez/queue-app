const btnAttendNext = document.querySelector('#btnAttendNext');
const titleCashier = document.querySelector('#title-cashier');
const currentTicket = document.querySelector('#current-ticket');
const noMoreTicket = document.querySelector('#no-more-ticket');
const lblPending = document.querySelector('#lbl-pending');

const searchParams = new URLSearchParams(window.location.search);
noMoreTicket.style.display = 'none';

if (!searchParams.has('cashier')) {
  window.location = 'index.html';
}

const cashier = searchParams.get('cashier');

const socket = io();

socket.on('connect', () => {
  btnAttendNext.disabled = false;
});

socket.on('disconnect', () => {
  btnAttendNext.disabled = true;
});

socket.on('queue-status', (tickets) => {
  lblPending.innerText = tickets.length ?? 0;
  console.log(tickets);
});

btnAttendNext.addEventListener('click', () => {
  noMoreTicket.style.display = 'none';

  socket.emit('attend-ticket', cashier, (payload) => {
    const { ok, ticket, msg } = payload;
    if (!ok) {
      noMoreTicket.style.display = '';
      return;
    }

    currentTicket.innerText = ticket.number;
  });

  /*  socket.emit('next-ticket', null, (ticket) => {
  }); */
});
