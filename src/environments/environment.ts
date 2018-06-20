// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	firebase  : {
		apiKey           : 'AIzaSyC8P8bRIZQ7vlGW810_1OW-SF_N-dbgYSI',
		authDomain       : 'angular-test-f89fd.firebaseapp.com',
		databaseURL      : 'https://angular-test-f89fd.firebaseio.com',
		projectId        : 'angular-test-f89fd',
		storageBucket    : 'angular-test-f89fd.appspot.com',
		messagingSenderId: '69097822595'
	},
	rollbar   : {
		accessToken               : '0582f625a38147b5b9a9de1c809319e7',
		captureUncaught           : true,
		captureUnhandledRejections: true,
	}
};
