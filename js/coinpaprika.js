import { cpData } from './api.js';

let coins = [];

export async function getGlobalMarketData() {
  return await cpData('/global');
}

export async function getAllCoins() {
  coins = await cpData('/coins');
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
 
export async function getCoinById(id) {
  return coins.find(c => c.id === id) || await cpData(`/coins/${id}`);
}

export async function getTodayOHLC(id) {
  return await cpData(`/coins/${id}/ohlcv/today/`);
}
 
export async function getCoinTwitterTimeline(id) {
  const data = await cpData(`/coins/${id}/twitter`) || [];
  // Filter retweets
  return data.filter(d => !d.is_retweet);
}
 
export async function getCoinEvents(id) {
  return await cpData(`/coins/${id}/events`);
}