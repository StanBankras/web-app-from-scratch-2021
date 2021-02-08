import { getCoinTwitterTimeline, getTopCoins, getCoinEvents, getTodayOHLC } from './coinpaprika.js'; 
import { getLatestItemByDate } from './utils.js';
import { appendEl, makeTweet, insertHTML } from './templating.js';
import router from './router.js';

const mainContent = document.querySelector('main .container');
const loading = document.querySelector('#loading');

(async function() {
  try {
    let coinsAdded = 0;
    while(coinsAdded < 20) {
      let coin = await getTopCoins(coinsAdded, coinsAdded + 1);
      coin = coin[0];
      let coinObject = {};
  
      const tweets = getCoinTwitterTimeline(coin.id);
      const events = getCoinEvents(coin.id);
      const ohlc = getTodayOHLC(coin.id);
      const data = await Promise.all([tweets, events, ohlc]);

      coinObject = {};
      coinObject.tweet = getLatestItemByDate(data[0] || [], 'date');
      coinObject.event = getLatestItemByDate(data[1] || [], 'date');
      coinObject.ohlc = data[2];
      coinObject.name = coin.name;
      coinObject.rank = coin.rank;

      console.log(coinObject);

      renderCoin(coinObject);
      coinsAdded++;
    }
  } catch(err) {
    console.error(err);
  }
})()

function renderCoin(coin) {
  if(coin.tweet) {
    const tweet = makeTweet(coin.tweet.user_name, coin.tweet.user_image_link, coin.tweet.user_name, coin.tweet.status, coin.tweet.date);
    insertHTML(mainContent, tweet, 'beforeEnd');
  }
  if(loading) loading.remove();
}