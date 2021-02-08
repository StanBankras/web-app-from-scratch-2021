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
  const cached = localStorage.getItem('coins');
  if(cached) {
    const parsed = JSON.parse(cached);
    if(new Date(parsed.expiryDate).getTime() > Date.now()) {
      coins = parsed.coins;
      return coins;
    }
  }

  coins = await cpData('/coins');
  localStorage.setItem('coins', JSON.stringify({ coins, expiryDate: new Date(Date.now() + 3600000) }));
  
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
  const data = await cpData(`/coins/${id}/twitter`) || [];
  // Filter retweets
  return data.filter(d => !d.is_retweet);
}
 
export async function getCoinEvents(id) {
  return await cpData(`/coins/${id}/events`);
}