const { DataSource } = require('apollo-datasource');
const { validateAndSanitzeUrl, generateSixUniqueChars } = require('../utils');

class ShortenUrlAPI extends DataSource {
  constructor({ prisma }) {
    super();
    this.prisma = prisma;
  }

  initialize(config) {}

  async allUrls() {
    const urls = await this.prisma.shortenUrl.findMany();
    return urls;
  }

  async addUrl({ url }) {
    try {
      const { error, message } = await validateAndSanitzeUrl(url);

      if (error) throw new Error(message);

      const { shortUrl } = await this.prisma.shortenUrl.upsert({
        where: {
          originalUrl: message,
        },

        update: {
          originalUrl: message,
        },

        create: {
          originalUrl: message,
          shortUrl: generateSixUniqueChars(),
        },
      });
      return shortUrl;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findUrl({ url }) {
    try {
      const urlExists = await this.prisma.shortenUrl.findUnique({
        where: {
          shortUrl: url,
        },
      });

      return urlExists;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ShortenUrlAPI;
