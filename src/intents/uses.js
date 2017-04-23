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
    } else {
      const { componentUsage, dependencies, } = data;
      const attachments = [];
      let text = '';

      if (componentUsage.length > 0) {
        text += `Component usage for ${subject}` + "\n";
        componentUsage.forEach((item) => {
          text += `<${item.codeURL}|From ${item.project}>` + "\n";
          text += `\`\`\`${item.snippet}\`\`\`` + "\n";
        });
      }

      if (dependencies.length > 0) {
        dependencies.forEach((item) => {
          if (item.direct.length > 0 || item.development.length > 0) {
            let compText = '';
            item.direct.forEach(({ version, projects, }) => {
              compText += `${version}: ${projects.join(', ')}` + "\n";
            });
            item.development.forEach(({ version, projects, }) => {
              compText += `${version}: ${projects.join(', ')}` + "\n";
            });
            attachments.push({
              title: `Dependency on ${item.name}`,
              text: compText,
            });
          }
        });
      }

      if (text === '' && attachments.length === 0) {
        text = `I couldn't find anything for "${subject}"`;
      }

      convo.say({
        text,
        unfurl_links: false,
        unfurl_media: false,
        attachments,
      });
      convo.next();
    }
  });
};
