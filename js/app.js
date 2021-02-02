import { getCoinTwitterTimeline, getTopCoins, getCoinEvents } from './coinpaprika.js'; 
import { getLatestItemByDate, append } from './utils.js';

let listedCoins = {};
const mainContent = document.querySelector('main');

main();

async function main() {
  try {
    const coins = await getTopCoins(20);
    let coinObject = {};

    for(const coin of coins) {
      const tweets = await getCoinTwitterTimeline(coin.id) || [];
      const events = await getCoinEvents(coin.id) || [];
      coinObject[coin.id] = {};
      coinObject[coin.id].tweet = getLatestItemByDate(tweets, 'date');
      coinObject[coin.id].event = getLatestItemByDate(events, 'date');
      coinObject[coin.id].name = coin.name;
    }

    listedCoins = coinObject;
    renderCoins();
  } catch(err) {
    console.error(err);
  }
}

function renderCoins() {
  Object.keys(listedCoins).forEach(coin => {
    const values = Object.values(listedCoins[coin]);
    for(const value of values) {
      append(mainContent, 'p', { innerHTML: JSON.stringify(value) })
    }
  });
}