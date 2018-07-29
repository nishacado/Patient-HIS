// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
    production: false,
    firebase: {
      apiKey: "AIzaSyDaohQafB8T2HG3k1_TD-EeM210hxMW-1E",
      authDomain: "patient-his.firebaseapp.com",
      databaseURL: "https://patient-his.firebaseio.com",
      projectId: "patient-his",
      storageBucket: "",
      messagingSenderId: "150420362025"
    }
  };