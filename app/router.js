import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('orders', function () {
  });
  this.resource('products', function () {
    this.route('all', {path: '/all'});
    this.route('list', {path: '/:listId'});
  });
});

// Would go on a separate file, but left here to make it easier to compare with main:router
/**
 * A ChildRouter delegates to its parentRouter (injected by the container) if the route isn't present
 */
var ChildRouter = Ember.Router.extend({
  // TODO: override trasitionTo, et.al to delegate to parentRouter
});
var ListsRouter = ChildRouter.extend();
ListsRouter.map(function () {
  this.resource('lists', function () {
    this.route('new');
    this.route('edit', {path: ':listId'});
  });
});


export default Router;
export { ListsRouter };
