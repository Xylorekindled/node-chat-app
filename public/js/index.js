var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'gen@example.com',
        text: 'Hey, This is this'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('Message: ', message);
});

