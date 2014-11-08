import Ember from 'ember';


export default Ember.ArrayProxy.extend(Ember.Array,{
  error: null,
  submit: null,

  startUpload: function() {
    this.get('submit').submit();
  },

  updateSizes: function(files) {
    this.forEach(function(item,index){
      item.set('size', files[index].size);
    });
  },

  updateErrors: function(error,files) {
    this.set('error');
    this.forEach(function(item,index){
      item.set('error', files[index].error);
    });
  },

  send: function(data) {
    this.forEach(function(item,index){
      item.set('status', 'uploading');
    });
  },

  done: function (data) {
   this.forEach(function(item,index){
      item.set('status', 'success');
    });
  },

  abort: function(error, data) {
    this.forEach(function(item,index){
      item.set('status', 'aborted');
      item.set('error', files[index].error || error);
    });
  },

  fail: function (error, data) {
    this.forEach(function(item,index){
      item.set('status', 'failed');
      item.set('error', files[index].error || error);
    });
  },

  progress: function (data) {
    this.forEach(function(item,index){
      item.set('progress', parseInt(data.loaded / data.total * 100, 10))
    });
  }
});
