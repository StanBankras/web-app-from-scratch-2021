export default function renderChart({ on, labels, series }) {
  const div = document.createElement('div');
  div.classList.add('ct-chart');
  on.appendChild(div);

  new Chartist.Line('.ct-chart', { labels, series }, {
      low: undefined,
      showArea: true,
      color: 'blue'
    });
}