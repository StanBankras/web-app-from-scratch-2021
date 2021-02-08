import overview from '../components/overview.js';
import coinDetail from '../components/coindetail.js';

const data = [
  {
    path: '#/',
    title: 'Home',
    enter: overview
  },
  {
    path: '#/coin/:id',
    title: 'Coin details',
    enter: coinDetail
  },
  {
    path: '#/404',
    title: 'Page not found'
  }
]

export default router
  .add(data, function() {})
  .onExit((route) => document.querySelector('main .container').innerHTML = '')
  .rescue(() => location.href = '#/404')
  .listen('#')