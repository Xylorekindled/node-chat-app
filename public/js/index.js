var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (position) {
    var image = jQuery(`<img src="${position.url}"/>`);

    var li = jQuery('<li></li>');
    li.append(image);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val(),
    }, function() {

    });
});

var locationButton = jQuery('#send-location');

    locationButton.on('click', function() {
    if(!navigator.geolocation) { return alert('Geolocation not supported by your browser.')};

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
    });

});

