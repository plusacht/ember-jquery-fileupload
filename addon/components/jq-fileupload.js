import Ember from 'ember';
import FileUploadModel from 'ember-jquery-fileupload/core/uploadFileModel';

var jqFileUpload = Ember.Component.extend({
  action: 'http://localhost:8888',
  tagName: "form",
  attributeBindings: ['action','method','enctype'],
  method: 'POST',
  enctype: 'multipart/form-data',

  overallProgress: 0,

  files: Ember.A(),

  _initFileUpload: function() {
    var self = this;

    this.$().fileupload({
      dataType: 'json',
      autoUpload: true
    })
    .on('fileuploadadd', function (e, data) {

      data.context = Ember.A();
      for (var i=0;i<data.files.length;i++) {
        data.context.push(
          FileUploadModel.create({
            name: data.files[i].name
          })
        );
        self.get('files').addObject(data.context[i]);
      }

    })
    .on('fileuploadsend', function(e, data) {
      for (var i=0;i<data.context.length;i++) {
        data.context[i].set('status', 'uploading');
      }
    })
    .on('fileuploadprogressall', function (e, data) {
      self.set('overallProgress',  parseInt(data.loaded / data.total * 100, 10));
    })
    .on('fileuploadprogress', function (e, data) {

      for (var i=0;i<data.context.length;i++) {
        data.context[i].set('progress', parseInt(data.loaded / data.total * 100, 10));
      }

    })
    .on('fileuploaddone', function (e, data) {
      for (var i=0;i<data.context.length;i++) {
        data.context[i].set('status', 'success');
      }
    })
    .on('fileuploadfail', function (e, data) {
      for (var i=0;i<data.context.length;i++) {
        data.context[i].set('status', 'error');
      }
    });
  }.on('didInsertElement')

});

export default jqFileUpload;
