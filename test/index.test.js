const expect = require('chai').expect;
const index = require('../index');

describe('orsa-bot index', () => {
  it('should invoke the bot', () => {
    index({
      process: {
        env: {
          ORSABOT_WIT_TOKEN: 'ORSABOT_WIT_TOKEN',
          ORSABOT_SLACK_TOKEN: 'ORSABOT_SLACK_TOKEN',
        },
      },
      bot: (options) => {
        expect(options.witToken).to.eql('ORSABOT_WIT_TOKEN');
        expect(options.slackToken).to.eql('ORSABOT_SLACK_TOKEN');
      },
    });
  });

  it('should check for the wit token', () => {
    index({
      process: {
        env: {
          ORSABOT_SLACK_TOKEN: 'ORSABOT_SLACK_TOKEN',
        },
      },
      console: {
        log(t) {
          expect(t).to.be.a.string;
        },
      },
    });
  });

  it('should check for the bot token', () => {
    index({
      process: {
        env: {
          ORSABOT_WIT_TOKEN: 'ORSABOT_WIT_TOKEN',
        },
      },
      console: {
        log(t) {
          expect(t).to.be.a.string;
        },
      },
    });
  });
});
