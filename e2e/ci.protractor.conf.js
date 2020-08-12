// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 110000,
  specs: [
    //'./src/**/*.e2e-spec.ts' // run all the testing scripts
    './src/app.e2e-spec.ts' // run this specific script
  ],
  capabilities: {
    chromeOptions: {
      args: [ "--headless", "--disable-browser-side-navigation" ]
    },
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  SELENIUM_PROMISE_MANAGER: false,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  }
};
