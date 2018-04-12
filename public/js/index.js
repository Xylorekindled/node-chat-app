var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h: mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });

    //var li = jQuery('<li></li>');
    //li.text(`${message.from} ${formatedTime}: ${message.text}`);

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (position, coords) {
    var clickMapString = `http://maps.google.com/maps?q=${coords.lat},${coords.lon}&z=18`
    var image = jQuery(`<br/><a href="${clickMapString}" target="_blank"><img src="${position.url}"/></a><br/>`);

    var formatedTime = moment(position.createdAt).format('h: mm a');
    var template = jQuery('#location-template').html();
    var html = Mustache.render(template, {
        from: position.from,
        clickMapLink: clickMapString,
        positionURL: position.url,
        createdAt: formatedTime
    });

    //var formatedTime = moment(position.createdAt).format('h: mm a');
    //var li = jQuery('<li></li>');
    //li.text(`${position.from}: ${formatedTime}`);
    //li.append(image);

    jQuery('#messages').append(html);
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
        locationButton.attr('disabled', 'disabled'); 
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

