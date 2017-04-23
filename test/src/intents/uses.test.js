const expect = require('chai').expect;
const uses = require('../../../src/intents/uses');

describe('uses intent', () => {
  it('should handle errors', () => {
    uses('react', {
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

  it('should find component usages', () => {
    uses('react', {
      say(info) {
        expect(info.text).to.be.a.string;
      },
      next() {},
    }, {
      search(sub, cb) {
        expect(sub).to.eql('react');
        cb(null, {
          componentUsage: [
            {
              snippet: 'foo',
              codeURL: 'http://cnn.com',
              project: 'bar',
            },
          ],
          dependencies: [],
        });
      },
    });
  });

  it('should find dependencies', () => {
    uses('react', {
      say(info) {
        expect(info.text).to.be.a.string;
      },
      next() {},
    }, {
      search(sub, cb) {
        expect(sub).to.eql('react');
        cb(null, {
          componentUsage: [
          ],
          dependencies: [
            {
              name: 'foo',
              direct: [
                {
                  version: '0.2',
                  projects: [
                    'a',
                    'b',
                  ],
                },
              ],
              development: [],
            },
            {
              name: 'bar',
              direct: [],
              development: [
                {
                  version: '0.2',
                  projects: [
                    'a',
                    'b',
                  ],
                },
              ],
            },
            {
              name: 'baz',
              direct: [],
              development: [],
            },
          ],
        });
      },
    });
  });

  it('should handle finding nothing', () => {
    uses('react', {
      say(info) {
        expect(info.text).to.be.a.string;
      },
      next() {},
    }, {
      search(sub, cb) {
        expect(sub).to.eql('react');
        cb(null, {
          componentUsage: [
          ],
          dependencies: [
          ],
        });
      },
    });
  });
});
