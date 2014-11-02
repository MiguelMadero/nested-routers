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

  // TODO: move to listsRouter
  this.resource('lists', function () {
    this.route('new');
    this.route('edit', {path: ':listId'});
  })
});

export default Router;
