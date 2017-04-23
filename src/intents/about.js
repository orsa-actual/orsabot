/* eslint no-useless-concat: 0, quotes: 0 */
const asyncUtils = require('async');
const assign = require('lodash.assign');

const {
  search,
  getComponents,
} = require('../orsa-queries')();

module.exports = (subject, convo, opts) => {
  const options = assign({
    asyncUtils,
    search,
    getComponents,
    console,
  }, opts);

  let components = [];
  let usages = [];

  options.asyncUtils.series([
    (done) => {
      options.getComponents(subject, (err, comps) => {
        if (err) {
          options.console.log(err.message);
        } else {
          components = comps;
        }
        done();
      });
    },
    (done) => {
      options.search(subject, (err, data) => {
        if (err) {
          options.console.log(err.message);
        } else {
          usages = data.componentUsage;
        }
        done();
      });
    },
  ], () => {
    let reply = '';
    if (components.length > 0 || usages.length > 0) {
      components.forEach((comp) => {
        reply += `${comp.name} is in <${comp.codeURL}|${comp.project}>` + "\n";
      });
      if (usages) {
        reply += "\n" + `Some usage of ${subject}:` + "\n";
        usages.forEach((item) => {
          reply += `<${item.codeURL}|From ${item.project}>` + "\n";
          reply += `\`\`\`${item.snippet}\`\`\`` + "\n";
        });
      }
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
  });
};
