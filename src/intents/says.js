/* eslint no-useless-concat: 0, quotes: 0 */
const assign = require('lodash.assign');
const {
  search,
} = require('../orsa-queries')();

module.exports = (subject, convo, opts) => {
  const options = assign({
    console,
    search,
  }, opts);
  options.search(subject, (err, data) => {
    if (err) {
      options.console.log(err.message);
      convo.say('I had an issue anwering your question');
      convo.next();
    } else {
      let reply = '';
      if (data.text.length > 0) {
        data.text.forEach((item) => {
          reply += `\`\`\`${item.snippet}\`\`\`` + "\n";
          reply += `<${item.codeURL}|View the code>` + "\n";
        });
      } else {
        reply = `I couldn't find anything for "${subject}"`;
      }
      convo.say({
        text: reply,
        unfurl_links: false,
        unfurl_media: false,
        attachments: [
          {},
        ],
      });
      convo.next();
    }
  });
};
