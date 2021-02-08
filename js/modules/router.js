import overview from '../components/overview.js';

const data = [
  {
    path: '#/',
    title: 'Home',
    enter: overview
  },
  {
    path: '#/coin/:id',
    title: 'Coin details'
  },
  {
    path: '#/404',
    title: 'Page not found'
  }
]

export default router
  .add(data, function() {})
  .onExit((route) => {
    // Clear the page
  })
  .rescue(() => {
    location.href = '#/404';
  })
  .listen('#')