import loader from '../components/loader.js';
import { getCoinMarketsById, getMonthlyChartData } from '../modules/data/api.js';
import { insertHTML, makeTable, renderChart } from '../modules/templating.js';

const mainContent = document.querySelector('main .container');

export default function coinDetail({ id }) {
  let coinName = id.split('-');
  coinName = coinName.slice(1, coinName.length).join(' ');
  loader.insert(mainContent, `${coinName} data is loading.`);

  // Waiting for coin details first, then start rendering
  getCoinDetails(id).then(({ markets, ohlcv }) => {
    loader.remove();

    const backButton = '<a href="#/" class="back-button">Back to top 20</a>';

    insertHTML(mainContent, backButton, 'beforeEnd');

    if(ohlcv) {
      renderChart({
        on: mainContent,
        labels: ohlcv.map(d => `${new Date(d.time_open).getDate()}-${new Date(d.time_open).getMonth() + 1}`),
        series: [ohlcv.map(d => d.close)]
      });
    }

    insertHTML(mainContent, `<h2>Markets</h2>`, 'beforeEnd');

    if(markets) {
      mainContent.appendChild(makeTable(markets));
    }
  });
}

async function getCoinDetails(id) {
  try {
    let markets = await getCoinMarketsById(id) || [];
    markets = markets.map(m => {
      return {
        'Exchange': m.exchange_name,
        'Pair': m.pair,
        'Name': m.base_currency_name,
        'Quote currency': m.quote_currency_name,
        '24h market share': `${m.adjusted_volume_24h_share.toFixed(3)}%`
      }
    });

    const ohlcv = await getMonthlyChartData(id);

    return {
      markets,
      ohlcv
    }
  } catch(err) {
    console.error(err);
    return undefined;
  }
}