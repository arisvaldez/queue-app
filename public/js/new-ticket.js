const lblNewTicket = document.querySelector('#lblNewTicket');
const btnNewTicket = document.querySelector('#btnNewTicket');

const socket = io();

socket.on('connect', () => {
  btnNewTicket.disabled = false;
  socket.on('last-ticket', (last) => {
    lblNewTicket.innerText = last;
  });
});

socket.on('disconnect', () => {
  btnNewTicket.disabled = true;
});

btnNewTicket.addEventListener('click', () => {
  socket.emit('next-ticket', null, (ticket) => {
    lblNewTicket.innerText = ticket.number;
  });
});
