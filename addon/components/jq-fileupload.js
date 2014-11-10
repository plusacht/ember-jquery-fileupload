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
  fileuploadOptions: ['replaceFileInput','paramName','singleFileUploads','limitMultiFileUploads','limitMultiFileUploadSize',
                      'limitMultiFileUploadSizeOverhead','sequentialUploads','limitConcurrentUploads','forceIframeTransport',
                      'redirect','redirectParamName','postMessage','multipart','maxChunkSize','uploadedBytes',
                      'recalculateProgress','progressInterval','bitrateInterval','autoUpload'],

  overallProgress: 0,
  uploads: Ember.A(),

  _initFileUpload: function() {
    var self = this;
    var options = {};
    Ember.run.scheduleOnce('afterRender', function() {
      self.get('fileuploadOptions').forEach(function(item){
        if(self[item] !== undefined) {
          options[item] = self[item];
        }
      });

      options.add = function(e, data) {
        var models = Ember.A();
        data.context = UploadModel.create({
          content: models,
          submit: data
        });

        data.files.forEach(function(item){
          models.addObject(
            FileUploadModel.create({
              name: item.name,
              type: item.type,
              lastModified: item.lastModified
            })
          );


        });

        self.get('uploads').addObject(data.context);

        data.process(function () {
          return self.$().fileupload('process', data);
        }).always(function () {
          data.context.updateFromFiles(self.$, data.files);
        }).done(function () {
          if(self.get('autoUpload')) {
            data.context.submit();
          }
        }).fail(function () {
          if (data.files.error) {
            data.context.fail(data.files.error, data.files);
          }
        });
      };

      options.send = function(e, data) {
        data.context.send(data);
      };

      options.done = function (e, data) {
        data.context.done(data);
      };

      options.fail = function (e, data) {
        if (data.errorThrown !== 'abort') {
          data.context.fail(data.errorThrown, data);
        } else {
          data.context.abort(data.errorThrown, data);
        }
      };

      options.progress = function (e, data) {
        data.context.progress(data);
      };

      options.progressall = function (e, data) {
        self.set('overallProgress',  parseInt(data.loaded / data.total * 100, 10));
      };

      options.start = function (e) {
        self.set('processing', true);
      };

      options.stop = function (e) {
        self.set('processing', false);
      };


      self.$().fileupload(options);

      self.disabledObserver();
    });
  }.on('didInsertElement'),

  disabledObserver: function() {
    if(this.get('disabled')) {
     this.$().fileupload('disable');
   } else {
      this.$().fileupload('enable');
   }
  }.observes('disabled'),

  actions: {
    startAllUploads: function() {
      this.get('uploads').forEach(function(item){
        item.startUpload();
      });
    },
    cancelAllUploads: function() {
      this.get('uploads').forEach(function(item){
        item.cancelUpload();
      });
    },
    startUpload: function(uploadModel) {
      uploadModel.startUpload();
    },
    cancelUpload: function(uploadModel) {
      uploadModel.cancelUpload();
    }
  },

  _destroyFileUpload: function() {
    this.$().fileupload('destroy');
  }.on("willDestroyElement")

});

export default jqFileUpload;
