import cache from './cache.js';

const cpBaseUrl = 'https://api.coinpaprika.com/v1';
let coins = [];

async function cpData(url) {
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 100));

  const res = await fetch(cpBaseUrl + url);
  return await res.json();
}

export async function getGlobalMarketData() {
  return await cpData('/global');
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
 
export async function getCoinById(id) {
  return coins.find(c => c.id === id) || await cpData(`/coins/${id}`);
}

export async function getTodayOHLC(id) {
  return await cpData(`/coins/${id}/ohlcv/today/`);
}
 
export async function getCoinTwitterTimeline(id) {
  if(cache.exists('tweets')) {
    const cached = cache.getItem('tweets');
    if(cached.data[id]) return cached.data[id];
  }

  let data = await cpData(`/coins/${id}/twitter`) || [];
  data = data.filter(d => !d.is_retweet);

  let tweets = {};
  if(cache.exists('tweets')) {
    tweets = cache.getItem('tweets').data;
    tweets[id] = data;
  } else {
    tweets[id] = data;
  }

  cache.setItem('tweets', tweets);

  return data;
}
 
export async function getCoinEvents(id) {
  return await cpData(`/coins/${id}/events`);
}