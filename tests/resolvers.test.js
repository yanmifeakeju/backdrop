const axios = require('axios');

describe('Mutation: add url', () => {
  test('Add a url', async () => {
    const response = await axios.post('http://localhost:3000/graphiql', {
      query: `
      mutation {
        shortenUrl(url:"https://facebook.com")
      }
      `,
    });
    const url = response.data.data.shortenUrl;
    const shortUrl = url.split('/');

    // const regEx = /https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    expect(shortUrl[shortUrl.length - 1].length).toEqual(6);
  });

  test('Get all urls', async () => {
    const response = await axios.post('http://localhost:3000/graphiql', {
      query: `
      mutation {
        shortenUrl(url:"https://facebook.com")
      }
      `,
    });
    const url = response.data.data.shortenUrl;
    const shortUrl = url.split('/');

    // const regEx = /https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    expect(shortUrl[shortUrl.length - 1].length).toEqual(6);
  });
});
