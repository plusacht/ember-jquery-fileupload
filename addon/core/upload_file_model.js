import Ember from 'ember';


export default Ember.Object.extend({
  name: null,
  lastModified:0,
  size: 0,
  type: null,
  deleteType: null,
  deleteUrl: null,
  url: null,
  progress:0,
  preview: null,
  status: "new", //new,uploading,success,failed,aborted
  error: null,

  previewHtml: function() {
    if(!Ember.isNone(this.get('preview'))) {
      return "a"+this.get('preview');
    }
  }.property('preview').cacheable(false)
});
