import { ListsRouter } from '../router';

export function initialize(container, application) {
  container.register('router:lists', ListsRouter);

  // container.injection('router:secondary', 'parentRouter', 'router:main');
  application.inject('router:lists', 'parentRouter', 'router:main');

  // TODO: based on Router.map we can probably loop through this or override the resolver.
  application.inject('route:lists', 'router', 'router:lists');
  application.inject('route:lists.new', 'router', 'router:lists');
  application.inject('route:lists.edit', 'router', 'router:lists');

  application.inject('controller:lists', 'target', 'router:lists');
  application.inject('controller:lists.new', 'target', 'router:lists');
  application.inject('controller:lists.edit', 'target', 'router:lists');

  // TODO: consider moving this to app.ready (app.then or use evented, see http://stackoverflow.com/questions/18830483/catch-app-ready-event-outside-the-app)
  container.lookup('router:lists').startRouting();
}

export default {
  name: 'child-router',
  initialize: initialize
};
