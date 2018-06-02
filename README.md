# HAVE A DRINK

Visualisation with various cocktail recipes.
Created with [Angular](https://angular.io/), [ngrx](https://github.com/ngrx), [D3.js](https://d3js.org/) and [firebase](https://firebase.google.com/)

## User interface
User interface consist of two parts:

### Visualisation
User facing part with multiple drink recipes and drink visualisation.
<img width="1215" alt="screen shot 2018-06-03 at 15 47 42" src="https://user-images.githubusercontent.com/16710005/40887778-9431ec7a-6745-11e8-95ef-02f2aa9391b4.png">


### CMS
Content Management System- part of the app that let you easily create new drinks which are saved in firebase database.
<img width="1211" alt="screen shot 2018-06-03 at 15 49 12" src="https://user-images.githubusercontent.com/16710005/40887786-c57800da-6745-11e8-83f9-e911174ee304.png">


#### Adding glass
To add new glass to CMS you need path for glass and mask which will be used to display ingredients.
You can find svg's with available glasses in `resources/glass_svg`. Simply copy path for glass and mask:
![add glass](https://user-images.githubusercontent.com/16710005/40887803-fc6538ba-6745-11e8-89ed-482c156d797e.jpg)


If you want to create a new mask for best result use one of already defined glasses svg's and edit it to create your glass.

#### Adding ingredient
Adding new ingredient is straightforward. You need to specify:
* name - ingredients name
* type - currently used only for alcohols for non-alcoholic ingredients you can leave it empty. It specify what type of alcohol is is which then is used in the app to filter by types of alcohols
* colour - colour that represents this ingredient
* alcohol - selected if ingredients contains alcohol. This field helps do define what alcohols are used in each drink.
<img width="606" alt="screen shot 2018-06-03 at 15 47 05" src="https://user-images.githubusercontent.com/16710005/40887793-dfe89754-6745-11e8-9880-3b7f4bb3736f.png">


#### Adding drink recipe
To create new drink recipe you need to specify following:
* name
* type - what is the type of drink. Currently there is predefined list of types
* description - drink description. Eg. how to prepare it
* glass - here you can select glass used for that drink from list of glasses you've defined
* ingredients - list of ingredients used and their amounts. Ingredients amounts are specified in cls. You can override that unit by specifying "custom amount" and by doing that ingredient will not be displayed as a layer in drink but as an additional ingredient.
<img width="793" alt="screen shot 2018-06-03 at 15 46 38" src="https://user-images.githubusercontent.com/16710005/40887796-e8fe2502-6745-11e8-9378-f206ecb04374.png">


## Installing

A step by step series of examples that tell you how to get a development env running

You can simply use NPM or yarn to initialise project
```
yarn install
```

#### Firebase setup (optional)
If you want to have full read/write access to the app you should set up your firebase database.

Once you do that you can replace my config in environment files(`src/environments/environment.ts` and `src/environments/environment.prod.ts`)

Simply replace `firebase` with your config.
```typescript
export const environment = {
	production: false,
	firebase  : {
		apiKey           : 'AIzaSyC8P8bRIZQ7vlGW810_1OW-SF_N-dbgYSI',
		authDomain       : 'angular-test-f89fd.firebaseapp.com',
		databaseURL      : 'https://angular-test-f89fd.firebaseio.com',
		projectId        : 'angular-test-f89fd',
		storageBucket    : 'angular-test-f89fd.appspot.com',
		messagingSenderId: '69097822595'
	}
};
```
You can find json with all drink from firebase in `resources/firebase/drink_db.json`, you can simply upload it to your database.
Also you can find there json file `resources/firebase/rules.json`, with database rules to ensure your data is formatted in the right way before saving to the database.

You'll also need to update guards for the csm. You can find them in `src/app/editor/guards/` by default app is using `AngularFireAuth`.
If you don't have your data protected you can simply remove guards from `src/app/editor/editor-routing.module.ts`.

## Running locally
To run app locally you simply run `start` script with your package manager
```
yarn start
```

Then you can access main app in your browser on `http://localhost:4200/` and CMS on `http://localhost:4200/editor`

## Running tests

### Unit tests

Run `test` script with npm or yarn to execute the unit tests via [Karma](https://karma-runner.github.io).

### End-to-end tests

Run `e2e` script with npm or yarn  execute the end-to-end tests via [Cypress](https://www.cypress.io/).

## Deployment

Project is setup to be deployed via [CircleCI](https://circleci.com/). You can find config file in `.cirlceci` directory.

You can use that config but you'll have to update the deployment script which is used to copy project build on to server.

Simply edit bash script in `scripts/deploy.sh` to satisfy your use. Otherwise `deploy` step of the CircleCi workflow will fail.

## Structure
```
│
├── yarn.lock           - yarn is default package manager used in this project
├── tslint.json
├── tsconfig.json
├── README.md
├── package-lock.json
├── package.json
├── karma.conf.js
├── cypress.json        - cypress e2e test runner config
├── .nycrc              - nyc config file containing test coverage min. thresholds
├── .gitignore
├── .editorconfig
├── .angular-cli.json
│
├── .circleci
│   └── config.yml      - CircleCi config file with full deployment workflow for dev and production
│
├── cypress             - cypress e2e tests, check https://www.cypress.io/ form more details
│   └── ...
│
├── resources           - additional resources used in this project
│   ├── firebase
│   │   ├── drink_db.json   - database dump
│   │   └── rules.json      - database protection rules
│   ├── glass_svg       - folder contains all glasses used in the app in form of svg's
│   └── ...
│
├── scripts
│   ├── deploy.sh       - script used in CircleCi workflow to deploy website to the server. Replace this file with your own
│   └── config-files
│       └── default.conf    - sample nginx config file that can be used on your server
│
├── src                 - source code of the app
└── testing             - files used in unit tests. Mocked services, mocked data etc.
```

## Scripts available
In package.json you can find following scripts:
```
"start"      - starts local developement environment. Once ready you can acces app under http://localhost:4200/
"build:dev"  - build the app ready for dev deployment 
"build:prod" - build the app ready for production
"serve"      - once app is build you can serve is locally, it will be available under http://localhost:4400/
"test"       - unit tests
"test:ci"    - units tests, single run with code coverage and headless chrome. Used mainly in CircleCi as part of the deployment
"lint"       - check linting
"e2e"        - running e2e tests with cypress
"e2e:ci"     - running e2e tests with single run and headless chrome. Used mainly in CircleCi as part of the deployment
"coverage"   - script is checking conde coverage. You need to run "test:ci" first
"analyze"    - used for analyzing your bundle size with webpack-bundle-analyzer. You need to run one of the buid scripts first
"bundlesize" - verifies bundle size according to thresholds specified in package.json, used as part of deployment workflow
```

## Authors

**[Mateusz Siek](http://msiek.com)** - [contact@msiek.com](contact@msiek.com), [@mateuszsiek91](https://twitter.com/mateuszsiek91)

## License

## Acknowledgments

* [IBA](http://iba-world.com/) resources were used to create list of cocktails
* Inspired by visualisation from the book "Information is Beautiful" by David McCandless
