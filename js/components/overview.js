import { getCoinTwitterTimeline, getCoinByRank, getCoinEvents, getTodayOHLC } from '../modules/api.js'; 
import { getLatestItemByDate } from '../modules/utils.js';
import { makeTweet, insertHTML } from '../modules/templating.js';

const mainContent = document.querySelector('main .container');
const loading = document.querySelector('#loading');

export default async function renderOverview() {
  try {
    // Get top 20 coins by rank and render them
    for(let i = 1; i <= 20; i++) {
      let coin = await getCoinByRank(i);
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
      coinObject.id = coin.id;
      coinObject.rank = coin.rank;

      renderCoin(coinObject);
    }
  } catch(err) {
    console.error(err);
  }
}

function renderCoin(coin) {
  const name = document.createElement('a');
  const linkText = document.createTextNode(coin.name);
  name.href = `#/coin/${coin.id}`;
  name.appendChild(linkText)
  mainContent.append(name);

  if(coin.tweet) {
    const tweet = makeTweet(coin.tweet.user_name, coin.tweet.user_image_link, coin.tweet.user_name, coin.tweet.status, coin.tweet.date);
    insertHTML(mainContent, tweet, 'beforeEnd');
  }
  if(loading) loading.remove();
}