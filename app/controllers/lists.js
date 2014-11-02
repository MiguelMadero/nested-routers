import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    // Needed here since in the current implementations views don't yet get the right router
    // so rendering {{link-to}}'s fail if the route isn't on the main one
    linkTo: function (route) {
      this.transitionToRoute(route);
    }
  }
});
