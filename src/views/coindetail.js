import loader from '../components/loader.js';
import { getCoinMarketsById, getMonthlyChartData } from '../modules/data/api.js';
import { insertHTML } from '../modules/templating.js';
import renderLineChart from '../components/linechart.js';
import makeTable from '../components/table.js';
import renderError from '../components/states/error.js';
import CryptoCurrency from '../models/cryptocurrency.js';

const mainContent = document.querySelector('main .container');

export default function coinDetail({ id }) {
  let coin = new CryptoCurrency(id);
  loader.insert(mainContent, `${coin.coinName} data is loading.`);

  // Waiting for coin details first, then start rendering
  getCoinDetails(id).then(({ markets, ohlcv, totalVolume }) => {
    loader.remove();

    insertHTML(mainContent, '<a href="#/" class="back-button">Back to top 20</a>', 'beforeEnd');
    insertHTML(mainContent, `<h1><span class="capitalize">${coin.coinName}</span> (${coin.ticker}) extra information</h1>`, 'beforeEnd');

    renderLineChart({
      on: mainContent,
      labels: ohlcv.map(d => `${new Date(d.time_open).getDate()}-${new Date(d.time_open).getMonth() + 1}`),
      series: [ohlcv.map(d => d.close)]
    });

    // Markets data
    insertHTML(mainContent, `<h2>Markets</h2>`, 'beforeEnd');
    mainContent.appendChild(makeTable(markets));

    insertHTML(mainContent, `<p class="volume">Total volume: ${totalVolume}</p>`, 'beforeEnd');
  }).catch((err) => {
    console.error(err);
    loader.remove();
    renderError(mainContent, `The information for <span class="capitalize">${coinName}</span> could not be found`);
  });
}

async function getCoinDetails(id) {
  let markets = await getCoinMarketsById(id) || [];
  markets = markets.map(m => {
    return {
      'Exchange': m.exchange_name,
      'Pair': m.pair,
      'Name': m.base_currency_name,
      'Quote currency': m.quote_currency_name,
      '24h volume': `${m.quotes[Object.keys(m.quotes)[0]].volume_24h.toFixed(2)}`
    }
  });

  const ohlcv = await getMonthlyChartData(id);
  const totalVolume = markets.reduce((prev, curr) => prev + Number(curr['24h volume']), 0);

  return {
    markets,
    ohlcv,
    totalVolume
  }
}