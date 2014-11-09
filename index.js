'use strict';

var path = require('path');

module.exports = {
  name: 'ember-jquery-fileupload',

  included: function(app) {
    this._super.included(app);

    var blueimpFileUploadPath = path.join(app.bowerDirectory,'/blueimp-file-upload/');
    var blueimpLoadImagePath = path.join(app.bowerDirectory,'/blueimp-load-image/')
    var options = app.options['ember-jquery-fileupload'] || {};

    app.import(path.join(blueimpLoadImagePath, 'js/load-image.all.min.js'));
    app.import(path.join(blueimpFileUploadPath, 'js/cors/jquery.postmessage-transport.js'));
    app.import(path.join(blueimpFileUploadPath, 'js/cors/jquery.postmessage-transport.js'));
    app.import(path.join(blueimpFileUploadPath, 'js/cors/jquery.xdr-transport.js'));
    app.import(path.join(blueimpFileUploadPath, 'js/vendor/jquery.ui.widget.js'));
    app.import(path.join(blueimpFileUploadPath, 'js/jquery.fileupload.js'));
    app.import(path.join(blueimpFileUploadPath, 'js/jquery.fileupload-process.js'));
    app.import(path.join(blueimpFileUploadPath, 'js/jquery.fileupload-image.js'));

    /*
    "css/jquery.fileupload.css",
    "css/jquery.fileupload-ui.css",
    "css/jquery.fileupload-noscript.css",
    "css/jquery.fileupload-ui-noscript.css",
    "js/cors/jquery.postmessage-transport.js",
    "js/cors/jquery.xdr-transport.js",
    "js/vendor/jquery.ui.widget.js",
    "js/jquery.fileupload.js",
    "js/jquery.fileupload-process.js",
    "js/jquery.fileupload-validate.js",
    "js/jquery.fileupload-image.js",
    "js/jquery.fileupload-audio.js",
    "js/jquery.fileupload-video.js",
    "js/jquery.fileupload-ui.js",
    "js/jquery.fileupload-jquery-ui.js",
    "js/jquery.fileupload-angular.js",
    "js/jquery.iframe-transport.js"
    */
  }
};
