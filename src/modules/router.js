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
  },
  {
    path: '#/404',
    title: 'Page not found'
  }
]

export default router
  .add(routes)
  .onExit(() => document.querySelector('main .container').innerHTML = '')
  .rescue(() => location.href = '#/')
  .listen('/');

export function init() {
  if(location.href.endsWith('index.html' || location.href.endsWith('/'))) {
    router.navigate('#/', true);
  }
}