import Ember from 'ember';


export default Ember.Component.extend({
  preview: null,

  _initPreview: function() {
    this.elementObserver();
  }.on('didInsertElement'),

  elementObserver: function() {
    if(!Ember.isNone(this.get('preview'))) {
      this.$('.jq-canvas-cont').append(Ember.$(this.get('preview')));
    }
  }.observes('preview')

});


