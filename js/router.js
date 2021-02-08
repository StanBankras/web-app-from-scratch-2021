const login = () => {
  // Here you can, by example, show a popup or change all the content
  // of the page.
  console.log('Login')
}

// This function handles routes for two rules, one of them has a placeholder
// ':id' whose value will be extracted from the hash that enters the route
// and placed in the property 'id' of 'params'.
// 'title' is a custom property of the route context defined by us.
//
// NOTE the use of the 'function' keyword, since we are accessing `this`,
//      we should not use an arrow function here.
//
const resourceEditor = function (params) {
  $('#header').html(this.title)

  // IMPORTANT: Parameter values are of type 'string', always.
  if (params.id) {
    console.log(`Editing the resource ${params.id}`)
  } else {
    console.log(`Creating a new resource.`)
  }
}

const data = [
  {
    path: '#/',
    title: 'Home'
  },
  {
    path: '#/coin/:id',
    title: 'Coin details'
  }
]

export default router
  // The `add` method adds routes without eliminating the previous ones.
  // Its additional parameter is the default `enter` method for the routes
  // that are added.
  .add(data, function (params) {
    // The `enter` method is executed in the context of the current route
    // and receives a parameter with values in the current hash.
    console.log(this.hash, params)
  })
  .onExit((route) => {
    // global callback called on exit a previous route
    console.log(`Leaving ${route ? route.hash : ''}`)
  })
  .onEnter((route) => {
    console.log(`Entering ${route ? route.hash : ''}`)
  })
  .rescue((hash) => {
    location.href = '404.html'
  })
  .listen('#')