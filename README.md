# Nested Routers (POC)

This is a POC about how to use nested-routers in Ember.JS allowing use to have multiple 'active' sections each with its own state management, routes, controllers, etc.

# Scenario

You have an app with different related concerns. I have a list of items on the left that affect some of the items on the right (think Github Issues). Something similar to the following mockup

![enter image description here][1]


All  fine, I click Item One and something happens on the right. However, the list on the left has its own routing requirements, it's a resource of items with nested routes. For example when we click on Create New Item we display a new form inline (see bottom left corner)

![enter image description here][2]

By default, in Ember, if you do that, even if it's on a different outlet, it overrides what is currently rendered in other outlets. In this case the products on the right.

You could just use components or call render and create a new view/controller (ugh!), but that would require you to handle the states in the component or controller.


# Proposed Solution

This POC explores the idea of creating multiple Routers.

* Each Router will have its own routes and maintain a separate state
* The main router, will have child-routers
* Only one router should use the URL to avoid conflicts. Meaning location `historiy` (or `hash`) will only be used once, ideally by the parent router. However, it's possible to use queryParams to encode the state of childRouters. The mockup above could be on `mysite/products/climbingShoes?childRouter=new`
* The entry-point for childRouters is via an nested-router-outlet on a template within a parentRoute. `{{nested-router-outlet "childRouter"}}`. This acts as a regular outlet, but changes the context of the route/controller rendered there. The childRouter takes over from there.
* By default, transitions (including link-to) from a child-route, will try to locate the corresponding route locally and the fallback to its parent route. If we transition to a separate parentRoute, the current childRoute will also be removed, since the `nested-route-outlet` won't be rendered.


# Under the Hood - Current Implementation (WIP)

A secondary router is created, registered with the container and injected into certain controllers. Better convention over configuration will be used to determine where each controller belongs.

        App.SecondaryRouter = Ember.Router.extend({
            location: 'none'
        });
        App.SecondaryRouter.map function () {...}

Then on an initializer we configure it so certain controllers/routes use the secondary router instead.

    initialize: function(container, application) {

        // some code removed for brevity...
        container.register('router:secondary', Ember.SecondaryRouter, { instantiate: false });
        container.injection('route:subSection', 'router', 'router:main');
        container.injection('route:subSection', 'router', 'router:secondary');
        container.injection('router:secondary', 'parentRouter', 'router:main');
    }

More ToDos:

* For that POC since we have a small subset of routes/per subrouter, hardcoding everything was a simple solution, however, we could extend the `Router.map` with metadata about sections to better support this feature, so we can have other routes. Alternatively we could use conventions so any route/controller/view/template group inside sections/section1 will be handled by the section1 router.
* SecondaryRouters delegate to the main/parent Router  (see the injection) for routes it doesn't know about, so we can easily `transitionTo` or `{{link-to}}` from a sub-section to routes in the main router. However, with this basic implementation we don't have an easy to way to link directly from a controller/route/view in the main route directly to a secondary router.


## Installation

* `git clone https://github.com/MiguelMadero/nested-routers` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

TODO

## Further Reading / Useful Links

* This concept was inspired by [this StackOverflow Question](http://stackoverflow.com/questions/20111301/different-ember-routes-or-displaying-two-complex-views-in-their-own-context)
* This app uses ember: http://emberjs.com/
* Also the ember-cli: http://www.ember-cli.com/

  [1]: http://i.stack.imgur.com/mbQb9.png
  [2]: http://i.stack.imgur.com/ktpyz.png
