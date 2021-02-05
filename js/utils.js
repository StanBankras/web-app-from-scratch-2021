const cpBaseUrl = 'https://api.coinpaprika.com/v1';

export async function cpData(url) {
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 50));

  const res = await fetch(cpBaseUrl + url);
  return await res.json();
}

export function append(renderOn, el, data) {
  const element = document.createElement(el);

  if(data.innerHTML) element.innerHTML = data.innerHTML;
  if(data.attributes) {
    Object.keys(data.attributes).forEach(attr => {
      element[attr] = data.attributes[attr];
    });
  }

  renderOn.appendChild(element);
}

export function sortByDate(items, dateKey) {
  return items.sort((a, b) => new Date(b[dateKey]).getTime() - new Date(a[dateKey]).getTime())
}

export function getLatestItemByDate(items, dateKey) {
  return sortByDate(items, dateKey)[0];
}