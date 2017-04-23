/* eslint no-console: 0 */
const bot = require('./src/bot');
const assign = require('lodash.assign');

module.exports = (opts) => {
  const options = assign({
    process,
    bot,
  }, opts);
  if (!options.process.env.ORSABOT_WIT_TOKEN) {
    options.console.log('You need to specify a Wit token with ORSABOT_WIT_TOKEN');
  } else if (!options.process.env.ORSABOT_SLACK_TOKEN) {
    options.console.log('You need to specify a Slack token with ORSABOT_SLACK_TOKEN');
  } else {
    options.bot({
      witToken: options.process.env.ORSABOT_WIT_TOKEN,
      slackToken: options.process.env.ORSABOT_SLACK_TOKEN,
    });
  }
};
