const { config } = require("../config");
const fetch = require("node-fetch");

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}

const controller = {
  bestsellers: async () => {
    try {
      const response = await fetch(
        `${config.nyApi}/best-sellers/history.json?offset=20&api-key=${config.nykey}`
      );
      const books = await response.json();

      console.log(books);
    } catch (error) {}
  },
};

module.exports = controller;
