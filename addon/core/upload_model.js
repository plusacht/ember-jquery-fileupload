import Ember from 'ember';


export default Ember.ArrayProxy.extend(Ember.MutableArray,{
  submit: null,

  startUpload: function() {
    this.get('submit').submit();
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

  fail: function (data) {
    this.forEach(function(item,index){
      item.set('status', 'failed');
    });
  },

  progress: function (data) {
    this.forEach(function(item,index){
      item.set('progress', parseInt(data.loaded / data.total * 100, 10))
    });
  }
});
