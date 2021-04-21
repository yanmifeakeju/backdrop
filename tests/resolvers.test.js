const axios = require('axios');

describe('Mutation: add url', () => {
  test('Add a url', async () => {
    const response = await axios.post('http://localhost:3000/graphiql', {
      query: `
      mutation {
        shortenURL(url:"https://facebook.com")
      }
      `,
    });

    const url = response.data.data.shortenURL;
    const shortUrl = url.split('/');

    expect(shortUrl[shortUrl.length - 1].length).toEqual(6);
  });

  test('Two URI written with or without www should return the same string', async () => {
    const firstResponse = await axios.post('http://localhost:3000/graphiql', {
      query: `
      mutation {
        shortenURL(url:"https://buycoins.com")
      }
      `,
    });
    const secondResponse = await axios.post('http://localhost:3000/graphiql', {
      query: `
      mutation {
        shortenURL(url:"https://www.buycoins.com")
      }
      `,
    });

    const urlOne = firstResponse.data.data.shortenURL;
    const urlTwo = secondResponse.data.data.shortenURL;

    expect(urlOne).toEqual(urlTwo);
  });

  // test('Get all urls', async () => {
  //   const response = await axios.post('http://localhost:3000/graphiql', {
  //     query: `
  //     query {
  //     urls
  //     }
  //     `,
  //   });
  // });
});
