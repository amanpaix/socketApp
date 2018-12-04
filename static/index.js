document.addEventListener('DOMContentLoaded', () => {
  // connect to websocket
  let socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // when connected, configure button
  socket.on('connect', () => {

    // Each button should emit a "submit vote" event
    document.querySelectorAll('button').forEach(button => {
      button.onclick = () => {
        const selection = button.dataset.vote;
        socket.emit('submit vote', {'selection': selection});
      };
    });
  });


  socket.on("vote totals", data => {
    document.querySelector("#yes").innerHTML = data.yes;
    document.querySelector("#no").innerHTML = data.no;
    document.querySelector("#maybe").innerHTML = data.maybe;
  });
});
