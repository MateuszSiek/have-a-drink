// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
	const withCodeCoverage = config.angularCli && config.angularCli.codeCoverage;
	config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
	    dir: require('path').join(__dirname, 'dist/coverage'),
	    reports: ['html', 'lcovonly', 'text-summary', 'json'],
	    fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
	browsers: [ withCodeCoverage ? 'ChromeHeadlessNoSandbox' : 'Chrome' ],
	customLaunchers: {
	  ChromeHeadlessNoSandbox: {
		  base : 'ChromeHeadless',
		  flags: ['--no-sandbox'],
	  },
	},
	singleRun: false
  });
};
