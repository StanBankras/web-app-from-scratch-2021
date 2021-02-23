// Checks if cache item is not expired, by lookign at its expiry date
function isNotExpired(item) {
  return new Date(item.expiryDate).getTime() > Date.now();
}

// Add expiry date to new cache item
function cacheExpiry() {
  return new Date(Date.now() + 3600000);
}

export default {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    if(item && isNotExpired(JSON.parse(item))) return JSON.parse(item);
    return undefined;
  },
  setItem: (name, data) => localStorage.setItem(name, JSON.stringify({ data, expiryDate: cacheExpiry() }))
}