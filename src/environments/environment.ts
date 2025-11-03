// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyB3v6vp4C8MmlI07JYg5f-Ku4NuhV0TZ18",
    authDomain: "haipy-2be41.firebaseapp.com",
    projectId: "haipy-2be41",
    storageBucket: "haipy-2be41.firebasestorage.app",
    messagingSenderId: "363509974403",
    appId: "1:363509974403:web:c55bd2c805744cbfa662b6",
    measurementId: "G-432J5F59VS"
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
