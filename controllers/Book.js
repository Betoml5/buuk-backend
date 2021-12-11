const { config } = require("../config");
const axios = require("axios");
const response = require("../network/response");

const controller = {
  bestsellers: async (req, res) => {
    try {
      const bestSellers = await axios({
        method: "GET",
        url: `${config.nyApi}/best-sellers/history.json?offset=20&api-key=${config.nykey}`,
      });
      let books = bestSellers.data.results;
      let isbns = books.map((book) => book.isbns);
      let filterIsbns = isbns.map((item) => item.map((item) => item.isbn10));
      const isbnsArray = [];
      for (let i = 0; i < filterIsbns.length; i++) {
        for (let j = 0; j < filterIsbns[i].length; j++) {
          isbnsArray.push(filterIsbns[i][j]);
        }
      }
      const results = [];
      for (let i = 0; i < isbnsArray.length; i++) {
        const response = await axios.get(
          `${config.openlibraryApi}?bibkeys=ISBN:${isbnsArray[i]}&jscmd=details&format=json`
        );
        results.push(response.data);
      }
      return response.success(req, res, results, 200);
    } catch (error) {
      console.log(error.message);
      return response.error(req, res, error, 500);
    }
  },
};

module.exports = controller;
