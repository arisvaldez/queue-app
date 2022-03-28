const lblTicket1 = document.querySelector('#lbl-ticket1');
const lblCashier1 = document.querySelector('#lbl-cashier1');
const lblTicket2 = document.querySelector('#lbl-ticket2');
const lblCashier2 = document.querySelector('#lbl-cashier2');
const lblTicket3 = document.querySelector('#lbl-ticket3');
const lblCashier3 = document.querySelector('#lbl-cashier3');
const lblTicket4 = document.querySelector('#lbl-ticket4');
const lblCashier4 = document.querySelector('#lbl-cashier4');

const socket = io();

socket.on('current-status', (tickets = []) => {
  const audio = new Audio('./audio/new-ticket.mp3');
  const [ticket1, ticket2, ticket3, ticket4] = tickets;

  let utterance = new SpeechSynthesisUtterance(
    'Ticket, Numero,' + ticket1.number + '. ' + ticket1.cashier
  );

  voices = speechSynthesis.getVoices();
  console.log(voices);
  utterance.voice = voices[8];
  if (voices.length > 0) {
    audio.play();
    speechSynthesis.speak(utterance);
  }

  lblTicket1.innerText = ticket1.number;
  lblCashier1.innerText = ticket1.cashier;
  lblTicket2.innerText = ticket2.number;
  lblCashier2.innerText = ticket2.cashier;
  lblTicket3.innerText = ticket3.number;
  lblCashier3.innerText = ticket3.cashier;
  lblTicket4.innerText = ticket4.number;
  lblCashier4.innerText = ticket4.cashier;
});
