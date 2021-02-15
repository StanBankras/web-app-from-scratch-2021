import cache from './cache.js';

const cpBaseUrl = 'https://api.coinpaprika.com/v1';
let coins = [];
let rateLimitPromise = Promise.resolve();

async function cpData(url) {
  return new Promise((resolve, reject) => {
    rateLimitPromise = rateLimitPromise.then(async () => {
      try {
        const res = await fetch(cpBaseUrl + url);
        const result = await res.json();
        setTimeout(() => resolve(result), 100);
      } catch(err) {
        reject(err);
      }
    });
  });

}

export async function getAllCoins() {
  const cached = cache.getItem('coins');
  if(cached) {
    coins = cached.data;
    return cached.data;
  }

  coins = await cpData('/coins');
  cache.setItem('coins', coins);
  
  return coins;
}

export async function getTopCoins(from, until) {
  if(coins.length === 0) await getAllCoins();
  return coins
    .sort((a, b) => {
      if(a.rank === 0) return 1;
      if(b.rank === 0) return -1;
      return b.rank < a.rank ? 1 : -1;
    })
    .slice(from, until);
}

export async function getCoinByRank(rank) {
  if(coins.length === 0) await getAllCoins();
  return coins.find(c => c.rank === rank);
}

export async function getTodayOHLC(id) {
  return await cpData(`/coins/${id}/ohlcv/today/`);
}

export async function getCoinMarketsById(id) {
  const cached = cache.getItem('markets');
  if(cached) {
    if(cached.data[id]) return cached.data[id];
  }

  const response = await cpData(`/coins/${id}/markets`);
  const data = response.slice(0, Math.min(response.length, 20));

  let markets = {};
  if(cached) {
    markets = cached.data;
    markets[id] = data;
  } else {
    markets[id] = data;
  }

  cache.setItem('markets', markets);

  return data;
}
 
export async function getCoinTwitterTimeline(id) {
  const cached = cache.getItem('tweets');
  if(cached) {
    if(cached.data[id]) return cached.data[id];
  }

  let data = await cpData(`/coins/${id}/twitter`) || [];
  data = data.filter(d => !d.is_retweet);

  let tweets = {};
  if(cached) {
    tweets = cached.data;
    tweets[id] = data;
  } else {
    tweets[id] = data;
  }

  cache.setItem('tweets', tweets);

  return data;
}
 
export async function getCoinEvents(id) {
  const cached = cache.getItem('events');
  if(cached) {
    if(cached.data[id]) return cached.data[id];
  }

  let data = await cpData(`/coins/${id}/events`) || {};

  let events = {};
  if(cached) {
    events = cached.data;
    events[id] = data;
  } else {
    events[id] = data;
  }

  cache.setItem('events', events);

  return data;

}