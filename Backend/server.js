const express = require("express");
const dotenv = require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const Cryptos = require("./models/CryptoInfoSchema");
const app = express();
const port = process.env.SERVER_PORT || 8000;

app.use(express.json());

app.use(cors({ origin: `${process.env.FRONTEND_URL}`, credentials: true }));
connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

async function fetchAndStoreCryptoData() {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickers = Object.values(response.data).slice(0, 10);

    const cryptoData = tickers.map((ticker) => ({
      name: ticker.name,
      last: ticker.last,
      buy: ticker.buy,
      sell: ticker.sell,
      volume: ticker.volume,
      base_unit: ticker.base_unit,
    }));

    await Cryptos.insertMany(cryptoData);
    console.log("Data stored successfully");
  } catch (err) {
    console.error("Error fetching or storing data:", err);
  }
}

setInterval(fetchAndStoreCryptoData, 60000);

app.get("/api/crypto", async (req, res) => {
  try {
    const data = await Cryptos.find();
    if (data.length === 0) {
      await fetchAndStoreCryptoData();
      res.status(404).json({ status: false, message: "Data not found" });
      return;
    }
    res.status(200).json({ status: true, data: data });
  } catch (error) {
    console.log(error);
  }
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
