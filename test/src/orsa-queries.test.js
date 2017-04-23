const expect = require('chai').expect;
const queries = require('../../src/orsa-queries');

describe('orsa-queries', () => {
  it('should look for ORSA_URL', () => {
    queries({
      graphQLClient(opts) {
        expect(opts.url).to.eql('foo');
      },
      process: {
        env: {
          ORSA_URL: 'foo',
        },
      },
    });
  });

  it('should default when ORSA_URL is not found', () => {
    queries({
      graphQLClient(opts) {
        expect(opts.url).to.eql('http://localhost:3000/graphql');
      },
    });
  });

  it('should getComponents successfully', () => {
    queries({
      graphQLClient() {
        return {
          query(q, { name, }) {
            expect(q).to.be.a.string;
            expect(name).to.eql('jack');
            return {
              then(cb) {
                cb({
                  data: {
                    components: [
                      'a',
                    ],
                  },
                });
                return {
                  catch() {
                  },
                };
              },
            };
          },
        };
      },
    }).getComponents('jack', (err, data) => {
      expect(err).to.be.null;
      expect(data).to.eql([
        'a',
      ]);
    });
  });

  it('should getComponents failure', () => {
    queries({
      graphQLClient() {
        return {
          query(q, { name, }) {
            expect(q).to.be.a.string;
            expect(name).to.eql('jack');
            return {
              then() {
                return {
                  catch(cb) {
                    cb(new Error('foo'));
                  },
                };
              },
            };
          },
        };
      },
    }).getComponents('jack', (err) => {
      expect(err).to.not.be.null;
    });
  });

  it('should search successfully', () => {
    queries({
      graphQLClient() {
        return {
          query(q, { text, }) {
            expect(q).to.be.a.string;
            expect(text).to.eql('jack');
            return {
              then(cb) {
                cb({
                  data: {
                    search: [
                      'a',
                    ],
                  },
                });
                return {
                  catch() {
                  },
                };
              },
            };
          },
        };
      },
    }).search('jack', (err, data) => {
      expect(err).to.be.null;
      expect(data).to.eql([
        'a',
      ]);
    });
  });

  it('should getComponents failure', () => {
    queries({
      graphQLClient() {
        return {
          query(q, { text, }) {
            expect(q).to.be.a.string;
            expect(text).to.eql('jack');
            return {
              then() {
                return {
                  catch(cb) {
                    cb(new Error('foo'));
                  },
                };
              },
            };
          },
        };
      },
    }).search('jack', (err) => {
      expect(err).to.not.be.null;
    });
  });
});
