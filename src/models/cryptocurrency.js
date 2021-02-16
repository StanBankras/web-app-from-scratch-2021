export default class CryptoCurrency {
  constructor(id) {
    this.id = id
  }

  get coinName() {
    let coinName = this.id.split('-');
    return coinName.slice(1, coinName.length).join(' ');
  }

  get ticker() {
    let coinName = this.id.split('-');
    return coinName[0];
  }
}