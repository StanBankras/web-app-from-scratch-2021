import loader from '../components/loader.js';
import { getCoinMarketsById } from '../modules/api.js';
import { makeTable } from '../modules/templating.js';

const mainContent = document.querySelector('main .container');

export default function coinDetail({ id }) {
  loader.insert(mainContent, 'Test');

  // Waiting for coin details first, then start rendering
  getCoinDetails(id).then(({ markets }) => {
    loader.remove();

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

    return {
      markets
    }
  } catch(err) {
    console.error(err);
    return undefined;
  }
}