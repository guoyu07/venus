// @author LinkedIn     

// Controls a phantomJS instance to run tests  
  
var phantom     = require('phantom-linkedin'),
    logger      = require('../util/logger'),
    i18n        = require('../util/i18n'),
    path        = require('path');

// Constructor for PhantomRunner  
function PhantomRunner() {};

// Initialize PhantomRunner object
PhantomRunner.prototype.init = function(url) {
  this.url = url;
};

// Run a test using PhantomJS
PhantomRunner.prototype.runTest = function(cb, url) {
  var browser = this.browser,
      loadUrl = url || this.url,
      done;

  if(typeof cb === 'function') {
    done = cb;
  } else {
    done = function() {};
  }

  logger.info( i18n('Phantom browser is loading %s', loadUrl) );

  phantom.create(function(ph) {
    return ph.createPage(function(page) {
      return page.open(loadUrl, function(status) {
        return page.evaluate((function() {
          return document.title;
        }), function(result) {
          setTimeout(ph.exit, 2000);
        });
      });
    });
  });
};

// Create a new instance of PhantomRunner  
function create(url) {
  var instance = new PhantomRunner();
  instance.init(url);
  return instance;
}

module.exports.PhantomRunner = PhantomRunner;
module.exports.create = create;
Object.seal(module.exports);