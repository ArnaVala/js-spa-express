//client-side entry point
import Dashboard from './views/Dashboard.js';
import Posts from './views/Posts.js';
import Settings from './views/Settings.js';

// history api - so page doesn't refresh - called with addEventListener 'click' on links with [data-link] on DOMContentLoad
const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};


// client-side router
// load views in router - with async function
const router = async () => {
  //define routes array
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/settings", view: Settings}
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

  // create a new instance for view
  const view = new match.route.view();

  // get the html from the views from the matching route - and inject into the element with id=app in the index.html
  document.querySelector('#app').innerHTML = await view.getHtml();

  console.log(match.route.view());
};

// history api - when user goes back in browser - change view
window.addEventListener('popstate', router);

// call the router func on dom load
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    //no page refresh - if clicking on target(link) matches data-link - prevents default behaviour to navigate to the link - goes to the href
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  })
  router();
});
