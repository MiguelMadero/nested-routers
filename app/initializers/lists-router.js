import ListsRouter from '../router';

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
}

export default {
  name: 'child-router',
  initialize: initialize
};
