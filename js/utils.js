const cpBaseUrl = 'https://api.coinpaprika.com/v1';

export async function cpData(url) {
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