import { getCoinTwitterTimeline, getCoinByRank, getCoinEvents } from '../modules/data/api.js'; 
import { getLatestItemByDate } from '../modules/utils.js';
import { insertHTML } from '../modules/templating.js';
import makeTweet from '../components/tweet.js';
import makeEvent from '../components/event.js';
import loader from '../components/loader.js';
import renderError from '../components/states/error.js';

const mainContent = document.querySelector('main .container');

export default async function renderOverview() {
  loader.insert(mainContent, 'Loading top 20 coins...');
  try {
    // Get top 20 coins by rank and render them
    // Render them 1 by 1, since it can take a while before all are loaded.
    for(let i = 1; i <= 20; i++) {
      const coin = await getCoinByRank(i);

      let tweets = getCoinTwitterTimeline(coin.id);
      let events = getCoinEvents(coin.id);
      [tweets, events] = await Promise.all([tweets, events]);

      const coinObject = {
        tweet: getLatestItemByDate(tweets || [], 'date'),
        event: getLatestItemByDate(events || [], 'date'),
        name: coin.name,
        id: coin.id,
        rank: coin.rank
      }

      renderCoin(coinObject);
      loader.reRender(mainContent);
    }
    loader.remove();
  } catch(err) {
    loader.remove();
    console.error(err);
    renderError(mainContent, 'Error while loading coin data. Please try again.', true)
  }
}

function renderCoin(coin) {
  const coinContainer = document.createElement('article');
  coinContainer.classList.add('coin');

  let event;
  let tweet;

  if(coin.tweet) {
    tweet = makeTweet(coin.tweet.user_name, coin.tweet.user_image_link, coin.tweet.user_name, coin.tweet.status, coin.tweet.date);
  }

  if(coin.event) {
    event = makeEvent(coin.event.name, coin.event.description, coin.event.link, coin.event.date);
  }

  const html = `
    <p class="rank">#${coin.rank}</p>
    <a href="#/coin/${coin.id}">
      <h3>${coin.name}</h3>
      <div class="wrapper">
        ${tweet ? tweet : ''}
        ${event ? event : ''}
      </div>
    </a>
  `;

  insertHTML(coinContainer, html, 'beforeEnd');
  mainContent.appendChild(coinContainer);

  // Trigger disTime, ideally want to do this just once, but the library doesn't work that way.
  disTime(0, 'en', true);
}