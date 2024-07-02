const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://admin:<password>@cluster0.1mlsrir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Add your database mongo uri

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const TickerSchema = new mongoose.Schema({
  name: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
  change_5min: Number,
  change_1hour: Number,
  change_1day: Number,
  change_7days: Number
});

const Ticker = mongoose.model('Ticker', TickerSchema);

app.get('/api/tickers', async (req, res) => {
  try {
    const tickers = await Ticker.find().limit(10);
    res.json(tickers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  fetchDataAndStore();
});

async function fetchDataAndStore() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const data = response.data;

    const top10 = Object.values(data).slice(0, 10).map(item => {
      console.log('Fetched item:', item);

      const change_5min = calculateChange(item.last, item.open_5min);
      const change_1hour = calculateChange(item.last, item.open_1hour);
      const change_1day = calculateChange(item.last, item.open_1day);
      const change_7days = calculateChange(item.last, item.open_7days);

      console.log(`Name: ${item.name}, Last: ${item.last}, Change 5min: ${change_5min}, Change 1hour: ${change_1hour}, Change 1day: ${change_1day}, Change 7days: ${change_7days}`);

      return {
        name: item.name,
        last: item.last,
        buy: item.buy,
        sell: item.sell,
        volume: item.volume,
        base_unit: item.base_unit,
        change_5min: change_5min !== null ? change_5min : 'N/A',
        change_1hour: change_1hour !== null ? change_1hour : 'N/A',
        change_1day: change_1day !== null ? change_1day : 'N/A',
        change_7days: change_7days !== null ? change_7days : 'N/A'
      };
    });

    await Ticker.deleteMany({});
    await Ticker.insertMany(top10);
    console.log('Data stored successfully');
  } catch (err) {
    console.log('Error fetching data:', err.message);
  }
}

function calculateChange(current, previous) {
  if (!previous || previous === 0) return null; // Handle missing or zero previous value
  return (((current - previous) / previous) * 100).toFixed(2);
}
