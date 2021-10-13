//client-side entry point
import Dashboard from './views/Dashboard.js';
import Posts from './views/Posts.js';
import PostView from './views/PostView.js';
import Settings from './views/Settings.js';

// for e.g. posts/:id paths
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

//returns keys and values for each of the parameters
const getParams = match => {
  //returns every single value from index 1 and forwards
  const values = match.result.slice(1);
  // key = id grab with matchAll iterator- 
  // this array takes a result from matchAll - grabs it into an array
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]]
  }));
};

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
    {path: "posts/:id", view: PostView},
    { path: "/settings", view: Settings}
  ];

  // Test each route - for match
  const potentialMatches = routes.map(route => {
    return {
      route: route,
      //change isMatch to results (of potentMatches)
      //isMatch: location.pathname === route.path
      result: location.pathname.match(pathToRegex(route.path))
    }
  });

  // find matching route after looping through all routes (boolean true or false)
  //let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch); (line31)
  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

  // if no route matches the path - then default route to dashboard (index 0 in our routes array)
  if (!match) {
    match = {
      route: routes[0],
      //isMatch: true
      result: [location.pathname]
    }
  }

  // create a new instance for view - getParams method
  const view = new match.route.view(getParams(match));

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
