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

export default Router;
