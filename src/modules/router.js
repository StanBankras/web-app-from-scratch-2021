import overview from '../views/overview.js';
import coinDetail from '../views/coindetail.js';
import router from '../libs/easyRouter.js'; 

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

// Make sure user is connected to the router on startup
export function init() {
  if(location.href.endsWith('index.html' || location.href.endsWith('/'))) {
    router.navigate('#/', true);
  }
}