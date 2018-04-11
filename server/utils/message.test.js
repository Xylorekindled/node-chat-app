var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res in variable
        var from = 'Jen';
        var text = 'Some Message';
        var message = generateMessage(from, text);

        expect(message.from).toInclude({
            from,
            text
        })

        // assert createdAt is Number
        expect(message.createdAt).toBeA('number');
    });
});