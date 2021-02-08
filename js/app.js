import { getCoinTwitterTimeline, getTopCoins, getCoinEvents } from './coinpaprika.js'; 
import { getLatestItemByDate } from './utils.js';
import { appendEl, makeTweet, insertHTML } from './templating.js';
import router from './router.js';

const mainContent = document.querySelector('main .container');

(async function() {
  try {
    const coins = await getTopCoins(3);
    let coinObject = {};

    for(const coin of coins) {
      const tweets = await getCoinTwitterTimeline(coin.id) || [];
      const events = await getCoinEvents(coin.id) || [];
      coinObject[coin.id] = {};
      coinObject[coin.id].tweet = getLatestItemByDate(tweets, 'date');
      coinObject[coin.id].event = getLatestItemByDate(events, 'date');
      coinObject[coin.id].name = coin.name;
      coinObject[coin.id].rank = coin.rank;
    }

    renderCoins(coinObject);
  } catch(err) {
    console.error(err);
  }
})()

function renderCoins(coins) {
  Object.values(coins).forEach(coin => {
    const tweet = makeTweet(coin.tweet.user_name, coin.tweet.user_image_link, coin.tweet.user_name, coin.tweet.status, coin.tweet.date);
    insertHTML(mainContent, tweet, 'beforeEnd');
  });
  document.querySelector('#loading').remove();
}