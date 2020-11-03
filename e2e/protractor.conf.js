// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 110000,
  specs: [
    //'./src/**/*.e2e-spec.ts' // run all the testing scripts
    //'./src/app.e2e-spec.ts',
    './src/desktop/unauthenticated-pages.e2e-spec.ts' // run this specific script
  ],
  capabilities: {
    /*chromeOptions: {
      args: [ "--headless" ]
    },*/
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
