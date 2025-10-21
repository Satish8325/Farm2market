// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const url = "https://localhost:7099";
// const url = "https://localhost:7209";
export const environment = {
    localStorageSecretKey: 'ZgWgK6y6c7F69mkFnR0UnIM6UBUcF1JS',
  production: false,
  defaultauth: 'fackbackend',



  login: url + '/api/Identity/authenticate',
  refreshToken: url + '/api/Identity/refreshToken',
  getOperatorsByUserId: url + '/api/User/operators',
  getOperatorsConfigDataByUserId: url + '/api/User/OperatorsConfigData',
 
  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
