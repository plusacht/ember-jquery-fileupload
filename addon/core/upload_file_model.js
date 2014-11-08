import Ember from 'ember';


export default Ember.Object.extend({
  name: null,
  size: 0,
  type: null,
  deleteType: null,
  deleteUrl: null,
  url: null,
  progress:0,
  status: "new", //new,uploading,success,failed,
  error: null
});
