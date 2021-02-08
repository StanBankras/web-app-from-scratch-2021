const cpBaseUrl = 'https://api.coinpaprika.com/v1';

export async function cpData(url) {
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 50));

  const res = await fetch(cpBaseUrl + url);
  return await res.json();
}