const graphQLClient = require('graphql-client');
const get = require('lodash.get');
const assign = require('lodash.assign');

module.exports = (opts) => {
  const options = assign({
    graphQLClient,
    process,
  }, opts);

  const orsaClient = options.graphQLClient({
    url: options.process.env.ORSA_URL || 'http://localhost:3000/graphql',
  });

  const getComponents = (name, cb) => {
    const query = `
query ($name: String){
  components(name: $name) {
    name
    project
    codeURL
  }
}
`;

    orsaClient.query(query, {
      name,
    })
    .then(body => cb(null, get(body, 'data.components')))
    .catch(err => cb(err));
  };

  const search = (text, cb) => {
    const query = `
query ($text: String){
  search(text: $text) {
    componentUsage {
      snippet
      project
      codeURL
    }
    classes {
      name
      codeURL
    }
    text {
      text
      snippet
      codeURL
    }
    dependencies {
      name
      direct {
        version
        projects
      }
      development {
        version
        projects
      }
    }
  }
}
`;

    orsaClient.query(query, {
      text,
    })
    .then(body => cb(null, get(body, 'data.search')))
    .catch(err => cb(err));
  };

  return {
    getComponents,
    search,
  };
};
