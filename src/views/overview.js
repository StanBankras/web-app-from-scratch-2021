import { getCoinTwitterTimeline, getCoinByRank, getCoinEvents } from '../modules/api.js'; 
import { getLatestItemByDate } from '../modules/utils.js';
import { makeTweet, insertHTML, makeEvent } from '../modules/templating.js';
import '../modules/disTime.js';
import loader from '../components/loader.js';

const mainContent = document.querySelector('main .container');
const loading = document.querySelector('#loading');

export default async function renderOverview() {
  loader.insert(mainContent, 'Loading top 20 coins...');
  try {
    // Get top 20 coins by rank and render them
    for(let i = 1; i <= 20; i++) {
      let coin = await getCoinByRank(i);
  
      const tweets = getCoinTwitterTimeline(coin.id);
      const events = getCoinEvents(coin.id);
      const data = await Promise.all([tweets, events]);

      const coinObject = {
        tweet: getLatestItemByDate(data[0] || [], 'date'),
        event: getLatestItemByDate(data[1] || [], 'date'),
        name: coin.name,
        id: coin.id,
        rank: coin.rank
      }

      renderCoin(coinObject);
      loader.reRender(mainContent);
    }
    loader.remove();
  } catch(err) {
    console.error(err);
  }
}

function renderCoin(coin) {
  if(loading) loading.remove();

  const coinContainer = document.createElement('article');
  coinContainer.classList.add('coin');

  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const link = document.createElement('a');
  link.href = `#/coin/${coin.id}`;

  const rank = document.createElement('p');
  rank.innerText = `#${coin.rank}`;
  rank.classList.add('rank');

  const name = document.createElement('h3');
  name.innerText = `${coin.name}`;

  coinContainer.appendChild(rank);
  coinContainer.appendChild(link);
  link.appendChild(name);

  if(coin.tweet) {
    const tweet = makeTweet(coin.tweet.user_name, coin.tweet.user_image_link, coin.tweet.user_name, coin.tweet.status, coin.tweet.date);
    insertHTML(wrapper, tweet, 'beforeEnd');
  }

  if(coin.event) {
    const event = makeEvent(coin.event.name, coin.event.description, coin.event.link, coin.event.date);
    insertHTML(wrapper, event, 'beforeEnd');
  }

  link.appendChild(wrapper);
  mainContent.appendChild(coinContainer);
  disTime(0, 'en', true);
}