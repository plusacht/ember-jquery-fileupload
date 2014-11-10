import Ember from 'ember';


export default Ember.ArrayProxy.extend(Ember.Array,{
  error: null,
  submit: null,

  startUpload: function() {
    this.get('submit').submit();
  },

  cancelUpload: function() {
    this.get('submit').abort();
  },

  updateFromFiles: function(jq,files) {
    this.forEach(function(item,index){
      item.set('size', files[index].size);
      item.set('preview', files[index].preview);
    });
  },

  updateErrors: function(error,files) {
    this.set('error', error);
    this.forEach(function(item,index){
      item.set('error', files[index].error);
    });
  },

  send: function(data) {
    this.forEach(function(item){
      item.set('status', 'uploading');
    });
  },

  done: function (data) {
   this.forEach(function(item){
      item.set('status', 'success');
    });
  },

  abort: function(error, data) {
    this.forEach(function(item,index){
      item.set('status', 'aborted');
      if(data.files.error) {
        item.set('error', data.files[index].error || error);
      }
    });
  },

  fail: function (error, data) {
    this.forEach(function(item,index){
      item.set('status', 'failed');
      item.set('error', data.files[index].error || error);
    });
  },

  progress: function (data) {
    this.forEach(function(item){
      item.set('progress', parseInt(data.loaded / data.total * 100, 10));
    });
  }
});
