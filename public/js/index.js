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

    var msgText = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: msgText.val(),
    }, function() {
        msgText.val('');
    });
});

var locationButton = jQuery('#send-location');

    locationButton.on('click', function() {
    if(!navigator.geolocation) 
    {
        //locationButton.attr('disabled', 'disabled'); 
        return alert('Geolocation not supported by your browser.')
    };

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');

        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });

});

