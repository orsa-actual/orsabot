/* eslint no-console: 0 */
const Botkit = require('botkit');
const {
  Wit,
} = require('node-wit');
const get = require('lodash.get');
const assign = require('lodash.assign');

const {
  uses,
  says,
  about,
} = require('./intents');

module.exports = (opts = {}) => {
  const options = assign({
    Wit,
    Botkit,
    uses,
    says,
    about,
    console,
  }, opts);

  const client = new options.Wit({
    accessToken: options.witToken,
  });

  const controller = options.Botkit.slackbot({
    debug: false,
  });

  controller.spawn({
    token: options.slackToken,
  })
  .startRTM((rtmErr) => {
    if (rtmErr) {
      options.console.error('Error connecting to Slack: ', rtmErr);
    } else {
      options.console.log('Connected to Slack');

      controller.hears('.*', 'direct_message,direct_mention', (bot, message) => {
        client.message(message.text, {})
          .then((data) => {
            const intent = get(data, 'entities.intent[0].value');
            const subject = get(data, 'entities.message_subject[0].value');
            if (intent === 'about') {
              bot.startConversation(message, (_, convo) => {
                options.about(subject, convo);
              });
            } else if (intent === 'says') {
              bot.startConversation(message, (_, convo) => {
                options.says(subject, convo);
              });
            } else if (intent === 'uses') {
              bot.startConversation(message, (_, convo) => {
                options.uses(subject, convo);
              });
            } else {
              options.console.log(intent, subject);
              bot.startConversation(message, (_, convo) => {
                convo.say('Sorry, I don\'t understand.');
                convo.next();
              });
            }
          })
          .catch((err) => {
            options.console.error(err);
            bot.startConversation(message, (_, convo) => {
              convo.say('Sorry, I don\'t understand.');
              convo.next();
            });
          });
      });
    }
  });
};
