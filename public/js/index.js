var socket = io();

socket.on('connect', function () {
    console.log('connected to server ', new Date().getTime());
});

socket.on('disconnect', function () {
    console.log('Disconnected from server ', new Date().getTime());
});

socket.on('newMessage', function (message) {
    console.log('Message: ', message);
});

