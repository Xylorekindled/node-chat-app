var generateMessage = (from, text) => {
    return { from, text, created: new Date().getTime() };
};

var generateLocationMessage = (from, lat, lon) => {
    
    var geo = `${lat},${lon}`;
    var mapSize = 18;
    var sizeWidth = 250;
    var sizeHeight = 200;
    var mapString = `https://maps.googleapis.com/maps/api/staticmap?center=${geo}&zoom=${mapSize}&size=${sizeWidth}x${sizeHeight}&markers=red|${geo}&key=AIzaSyDQjBzueh78LfxK1J06s-NCz7VXfEn2c8o`;
    
    return { 
        from,
        url: mapString,
        createdAt: new Date().getTime()
    };
};

module.exports = { generateMessage, generateLocationMessage };