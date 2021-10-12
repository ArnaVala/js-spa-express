//client-side entry point
//console.log('works')

// client-side router
// load views in router - with async function
const router = async () => {
  //define routes array
  const routes = [
    { path: "/", view: () => console.log('viewing dashboard') },
    { path: "/posts", view: () => console.log('viewing posts') },
    { path: "/settings", view: () => console.log('viewing settings') },
  ];

  // Test each route - for match
  const potentialMatches = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path
    }
  });

  // find matching route after looping through all routes (boolean true or false)
  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

  // if no route matches the path - then default route to dashboard (index 0 in our routes array)
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true
    }
  }
  console.log(match);
};

// call the router func on dom load
document.addEventListener('DOMContentLoaded', () => {
  router();
});