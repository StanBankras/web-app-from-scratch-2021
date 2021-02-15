import { getCoinMarketsById } from '../modules/api.js';
import { insertHTML, makeTable } from '../modules/templating.js';

const mainContent = document.querySelector('main .container');

export default function coinDetail({ id }) {

  // Waiting for coin details first, then start rendering
  getCoinDetails(id).then(({ markets }) => {
    if(markets) {
      const mappedMarkets = markets.slice(0, 20).map(m => {
        return {
          'Exchange': m.exchange_name,
          'Pair': m.pair,
          'Name': m.base_currency_name,
          'Quote currency': m.quote_currency_name,
          '24h market share': `${m.adjusted_volume_24h_share.toFixed(3)}%`
        }
      })
      mainContent.appendChild(makeTable(mappedMarkets));
    }
  });
}

async function getCoinDetails(id) {
  try {
    const markets = await getCoinMarketsById(id);
    return {
      markets
    }
  } catch(err) {
    console.error(err);
    return undefined;
  }
}