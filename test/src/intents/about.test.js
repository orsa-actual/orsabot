const expect = require('chai').expect;
const about = require('../../../src/intents/about');

describe('about intent', () => {
  it('should handle errors', () => {
    about('react', {
      say(info) {
        expect(info.text).to.be.a.string;
      },
      next() {},
    }, {
      console: {
        log() {},
      },
      getComponents(sub, cb) {
        expect(sub).to.eql('react');
        cb(new Error('Foo!'));
      },
      search(sub, cb) {
        expect(sub).to.eql('react');
        cb(new Error('Foo!'));
      },
      asyncUtils: {
        series(arr, cb) {
          arr[0](() => {});
          arr[1](() => {});
          cb();
        },
      },
    });
  });

  it('should find component usages', () => {
    about('react', {
      say(info) {
        expect(info.text).to.be.a.string;
      },
      next() {},
    }, {
      getComponents(sub, cb) {
        expect(sub).to.eql('react');
        cb(null, []);
      },
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
        });
      },
      asyncUtils: {
        series(arr, cb) {
          arr[0](() => {});
          arr[1](() => {});
          cb();
        },
      },
    });
  });

  it('should find component components', () => {
    about('react', {
      say(info) {
        expect(info.text).to.be.a.string;
      },
      next() {},
    }, {
      getComponents(sub, cb) {
        expect(sub).to.eql('react');
        cb(null, [
          {
            name: 'foo',
            codeURL: 'http://cnn.com',
            project: 'bar',
          },
        ]);
      },
      search(sub, cb) {
        expect(sub).to.eql('react');
        cb(null, []);
      },
      asyncUtils: {
        series(arr, cb) {
          arr[0](() => {});
          arr[1](() => {});
          cb();
        },
      },
    });
  });

  it('should find neither usages nor components', () => {
    about('react', {
      say(info) {
        expect(info.text).to.be.a.string;
      },
      next() {},
    }, {
      getComponents(sub, cb) {
        expect(sub).to.eql('react');
        cb(null, []);
      },
      search(sub, cb) {
        expect(sub).to.eql('react');
        cb(null, {
          componentUsage: [],
        });
      },
      asyncUtils: {
        series(arr, cb) {
          arr[0](() => {});
          arr[1](() => {});
          cb();
        },
      },
    });
  });
});
