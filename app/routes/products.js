import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function () {
    this._super.apply(this, arguments);
    // this.render({outlet: 'lists'});
    this.render('lists', {
      into: 'products',
      outlet: 'lists',
      controller: this.controllerFor('lists')
    });
  }
});
