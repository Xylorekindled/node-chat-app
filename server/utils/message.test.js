var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res in variable
        var from = 'Jen';
        var text = 'Some Message';
        var message = generateMessage(from, text);

        console.log(message);
        expect(message).toInclude({from, text});

        // assert createdAt is Number
        expect(message.createdAt).toBeA('number');
    });
});