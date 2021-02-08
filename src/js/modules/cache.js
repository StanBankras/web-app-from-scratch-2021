function isNotExpired(item) {
  return new Date(item.expiryDate).getTime() > Date.now();
}

function cacheExpiry() {
  return new Date(Date.now() + 3600000);
}

export default {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    if(item && isNotExpired(JSON.parse(item))) return JSON.parse(item);
    return undefined;
  },
  setItem: (name, data) => localStorage.setItem(name, JSON.stringify({ data, expiryDate: cacheExpiry() })),
  exists: (name) => localStorage.hasOwnProperty(name)
}