const expect = require('chai').expect;
const says = require('../../../src/intents/says');

describe('says intent', () => {
  it('should handle errors', () => {
    says('react', {
      say(info) {
        expect(info.text).to.be.a.string;
      },
      next() {},
    }, {
      console: {
        log() {},
      },
      search(sub, cb) {
        expect(sub).to.eql('react');
        cb(new Error('Foo!'));
      },
    });
  });

  it('should find text usages', () => {
    says('react', {
      say(info) {
        expect(info.text).to.be.a.string;
      },
      next() {},
    }, {
      search(sub, cb) {
        expect(sub).to.eql('react');
        cb(null, {
          text: [
            {
              snippet: 'foo',
              codeURL: 'http://cnn.com',
              project: 'bar',
            },
          ],
        });
      },
    });
  });

  it('should handle not finding text usages', () => {
    says('react', {
      say(info) {
        expect(info.text).to.be.a.string;
      },
      next() {},
    }, {
      search(sub, cb) {
        expect(sub).to.eql('react');
        cb(null, {
          text: [
          ],
        });
      },
    });
  });
});
