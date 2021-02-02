import { cpData, append } from './utils.js';

let coins = [];

main();

async function main() {
  try {
    coins = await getCoins();
    console.log(coins);
    coins
      .slice()
      .sort((a, b) => {
        if(a.rank === 0) return 1;
        if(b.rank === 0) return -1;
        return b.rank < a.rank ? 1 : -1;
      })
      .slice(0, 10)
      .forEach(coin => {
        append(mainContent, 'p', { innerHTML: coin.name });
      });
  } catch(err) {
    console.error(err);
  }
}

async function getGlobalMarketData() {
  return await cpData('/global');
}

async function getCoins() {
  return await cpData('/coins');
}
 
async function getCoinById(id) {
  return coins.find(c => c.id === id) || await cpData(`/coins/${id}`);
}

const mainContent = document.querySelector('main');