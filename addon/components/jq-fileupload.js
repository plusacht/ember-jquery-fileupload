import Ember from 'ember';
import FileUploadModel from 'ember-jquery-fileupload/core/upload_file_model';
import UploadModel from 'ember-jquery-fileupload/core/upload_model';

var jqFileUpload = Ember.Component.extend({
  action: 'http://localhost:8888',
  tagName: "form",
  attributeBindings: ['action','method','enctype'],
  method: 'POST',
  enctype: 'multipart/form-data',
  disabled: false,

  overallProgress: 0,


  autoUpload: false,
  //dataType: 'json',
  uploads: Ember.A(),

  _initFileUpload: function() {
    var self = this;

    this.$().fileupload({
      dataType: 'json',
      autoUpload: true,
      singleFileUploads: false,

      add: function(e, data) {
        var models = Ember.A();
        data.context = UploadModel.create({
          content: models,
          submit: data
        });

        data.files.forEach(function(item){
          models.addObject(
            FileUploadModel.create({
              name: item.name,
              status: "uploading"
            })
          );


        });

        self.get('uploads').addObject(data.context);

        data.process(function () {
          return self.$().fileupload('process', data);
        }).always(function () {
          data.context.updateSizes(data.files);
        }).done(function () {
          if(self.get('autoUpload')) {
            data.context.submit();
          }
        }).fail(function () {
          if (data.files.error) {
            data.context.fail(data.files.error, files);
          }
        });
      },

      send: function(e, data) {
        data.context.send(data);
      },

      done: function (e, data) {
        data.context.done(data);
      },

      fail: function (e, data) {
        if (data.errorThrown !== 'abort') {
          data.context.fail(data.errorThrown, data);
        } else {
          data.context.abort(data.errorThrown, data);
        }

      },

      progress: function (e, data) {
        debugger;
        data.context.progress(data);
      },

      progressall: function (e, data) {
        self.set('overallProgress',  parseInt(data.loaded / data.total * 100, 10));
      },
      start: function (e) {
        console.log("start");
        self.set('processing', true);
      },
      stop: function (e) {
        console.log("stop");
        self.set('processing', false);
      }
    });
  }.on('didInsertElement'),

  disabledObserver: function() {
    if(this.get('disabled')) {
     this.$().fileupload('disable');
   } else {
      this.$().fileupload('enable');
   }
  }.on('disabled'),

  actions: {
    startAllUploads: function() {
      this.get('uploads').forEach(function(item){
        item.startUpload();
      })
    },
    startUpload: function(uploadModel) {
      uploadModel.startUpload();
    }
  },

  _destroyFileUpload: function() {
    this.$().fileupload('destroy');
  }.on("willDestroyElement")

});

export default jqFileUpload;
