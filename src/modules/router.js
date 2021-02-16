import overview from '../views/overview.js';
import coinDetail from '../views/coindetail.js';

const routes = [
  {
    path: '#/',
    title: 'Home',
    enter: overview
  },
  {
    path: '#/coin/:id',
    title: 'Coin details',
    enter: coinDetail
  }
]

export default router
  .add(routes)
  .onExit(() => document.querySelector('main .container').innerHTML = '')
  .rescue(() => location.href = '#/')
  .listen('/');