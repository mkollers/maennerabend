// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0: {
    clientID: 'luXjAIt0u1uetW8hI2VtqZFAlXfLy1do',
    domain: 'der-willi.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://www.der-willi.de',
    redirectUri: `${window.location.origin}/redirect`,
    scope: 'openid profile email'
  } as auth0.AuthOptions,
  firebase: {
    apiKey: 'AIzaSyBedwqxitzrFc2QTvARKaeYghPwXhEbbKQ',
    authDomain: 'der-willi.firebaseapp.com',
    databaseURL: 'https://der-willi.firebaseio.com',
    projectId: 'der-willi',
    storageBucket: 'der-willi.appspot.com',
    messagingSenderId: '112818989948'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
