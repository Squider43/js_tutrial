const PORT = 8000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.listen(PORT, () => console.log("running"));

const URL = "https://shopping.yahoo.co.jp/search?first=1&tab_ex=commerce&fr=shp-prop&mcr=65ee32d059e7a7f3fdd21830110014c4&ts=1700066681&sretry=1&p=keyboard&sc_i=shp_pc_top_searchBox&area=13";
const data = [];

axios(URL)
  .then((response) => {
    const htmlParser = response.data;
    // console.log(htmlParser);
    const $ = cheerio.load(htmlParser);

    $(".LoopList__item", htmlParser).each(function () {
      const title = $(this).find(".SearchResultItemTitle_SearchResultItemTitle__name__N_aB9").text();
      const price = $(this).find(".SearchResultItemPrice_SearchResultItemPrice__value__C03NT").text();
      data.push({ title, price });
      console.log(data);
    });
  })
  .catch((error) => console.log(error));