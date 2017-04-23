const expect = require('chai').expect;
const bot = require('../../src/bot');

class FailingWit {
  constuctor(opts) {
    expect(opts.accessToken).to.eql('foo');
  }
  message(text, opts) {
    expect(text).to.eql('Foo');
    expect(opts).to.eql({});
    return {
      then() {
        return {
          catch(cb) {
            cb(new Error('Foo!'));
          },
        };
      },
    };
  }
}

const createWit = (intent, subject) => (
  class Wit {
    constuctor(opts) {
      expect(opts.accessToken).to.eql('foo');
    }
    message(text, opts) {
      expect(text).to.eql('Foo');
      expect(opts).to.eql({});
      return {
        then(cb) {
          cb({
            entities: {
              intent: [
                {
                  value: intent,
                },
              ],
              message_subject: [
                {
                  value: subject,
                },
              ],
            },
          });
          return {
            catch() {
            },
          };
        },
      };
    }
  }
);

describe('orsa-queries', () => {
  it('should handle uses', () => {
    bot({
      console: {
        log() {},
      },
      Wit: createWit('uses', 'react'),
      witToken: 'foo',
      Botkit: {
        slackbot(opts) {
          expect(opts.debug).to.be.false;
          return {
            spawn(spawnOpts) {
              expect(spawnOpts.token).to.eql('slackFoo');
              return {
                startRTM(cb) {
                  cb();
                },
              };
            },
            hears(a, b, cb) {
              expect(a).to.eql('.*');
              expect(b).to.eql('direct_message,direct_mention');
              cb({
                startConversation(message, cb2) {
                  expect(message).to.eql({
                    text: 'Foo',
                  });
                  cb2(null, 'a');
                },
              }, {
                text: 'Foo',
              });
            },
          };
        },
      },
      slackToken: 'slackFoo',
      uses(subject, convo) {
        expect(subject).to.eql('react');
        expect(convo).to.eql('a');
      },
    });
  });

  it('should handle about', () => {
    bot({
      console: {
        log() {},
      },
      Wit: createWit('about', 'react'),
      witToken: 'foo',
      Botkit: {
        slackbot(opts) {
          expect(opts.debug).to.be.false;
          return {
            spawn(spawnOpts) {
              expect(spawnOpts.token).to.eql('slackFoo');
              return {
                startRTM(cb) {
                  cb();
                },
              };
            },
            hears(a, b, cb) {
              expect(a).to.eql('.*');
              expect(b).to.eql('direct_message,direct_mention');
              cb({
                startConversation(message, cb2) {
                  expect(message).to.eql({
                    text: 'Foo',
                  });
                  cb2(null, 'a');
                },
              }, {
                text: 'Foo',
              });
            },
          };
        },
      },
      slackToken: 'slackFoo',
      about(subject, convo) {
        expect(subject).to.eql('react');
        expect(convo).to.eql('a');
      },
    });
  });

  it('should handle about', () => {
    bot({
      console: {
        log() {},
      },
      Wit: createWit('says', 'react'),
      witToken: 'foo',
      Botkit: {
        slackbot(opts) {
          expect(opts.debug).to.be.false;
          return {
            spawn(spawnOpts) {
              expect(spawnOpts.token).to.eql('slackFoo');
              return {
                startRTM(cb) {
                  cb();
                },
              };
            },
            hears(a, b, cb) {
              expect(a).to.eql('.*');
              expect(b).to.eql('direct_message,direct_mention');
              cb({
                startConversation(message, cb2) {
                  expect(message).to.eql({
                    text: 'Foo',
                  });
                  cb2(null, 'a');
                },
              }, {
                text: 'Foo',
              });
            },
          };
        },
      },
      slackToken: 'slackFoo',
      says(subject, convo) {
        expect(subject).to.eql('react');
        expect(convo).to.eql('a');
      },
    });
  });

  it('should handle no intent', () => {
    bot({
      console: {
        log() {},
      },
      Wit: createWit('', ''),
      witToken: 'foo',
      Botkit: {
        slackbot(opts) {
          expect(opts.debug).to.be.false;
          return {
            spawn(spawnOpts) {
              expect(spawnOpts.token).to.eql('slackFoo');
              return {
                startRTM(cb) {
                  cb();
                },
              };
            },
            hears(a, b, cb) {
              expect(a).to.eql('.*');
              expect(b).to.eql('direct_message,direct_mention');
              cb({
                startConversation(message, cb2) {
                  expect(message).to.eql({
                    text: 'Foo',
                  });
                  cb2(null, {
                    say(text) {
                      expect(text).to.be.a.string;
                    },
                    next() {
                    },
                  });
                },
              }, {
                text: 'Foo',
              });
            },
          };
        },
      },
      slackToken: 'slackFoo',
    });
  });

  it('should handle a wit failure', () => {
    bot({
      console: {
        log() {},
        error() {},
      },
      Wit: FailingWit,
      witToken: 'foo',
      Botkit: {
        slackbot(opts) {
          expect(opts.debug).to.be.false;
          return {
            spawn(spawnOpts) {
              expect(spawnOpts.token).to.eql('slackFoo');
              return {
                startRTM(cb) {
                  cb();
                },
              };
            },
            hears(a, b, cb) {
              expect(a).to.eql('.*');
              expect(b).to.eql('direct_message,direct_mention');
              cb({
                startConversation(message, cb2) {
                  expect(message).to.eql({
                    text: 'Foo',
                  });
                  cb2(null, {
                    say(text) {
                      expect(text).to.be.a.string;
                    },
                    next() {
                    },
                  });
                },
              }, {
                text: 'Foo',
              });
            },
          };
        },
      },
      slackToken: 'slackFoo',
    });
  });

  it('should handle a bad RTM', () => {
    bot({
      console: {
        log() {},
        error() {},
      },
      Wit: FailingWit,
      witToken: 'foo',
      Botkit: {
        slackbot(opts) {
          expect(opts.debug).to.be.false;
          return {
            spawn(spawnOpts) {
              expect(spawnOpts.token).to.eql('slackFoo');
              return {
                startRTM(cb) {
                  cb(new Error('Foo!'));
                },
              };
            },
          };
        },
      },
      slackToken: 'slackFoo',
    });
  });
});
