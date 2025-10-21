const url = "https://localhost:7099";

export const environment = {
      localStorageSecretKey: 'ZgWgK6y6c7F69mkFnR0UnIM6UBUcF1JS',
  production: false,
  defaultauth: 'fackbackend',



  login: url + '/api/Identity/authenticate',
  refreshToken: url + '/api/Identity/refreshToken',
  getOperatorsByUserId: url + '/api/User/operators',
  getOperatorsConfigDataByUserId: url + '/api/User/OperatorsConfigData',
 
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};
