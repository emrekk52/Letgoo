// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   API_PRODUCT_URL:"http://localhost:61061/api/product",
   API_CITY_URL:"http://localhost:61061/api/city",
   API_IMAGE_URL:"http://localhost:61061/api/image",
   API_AUTH_URL:"http://localhost:61061/api/auth",
   API_PROFILE_URL:"http://localhost:61061/api/profile",
   API_CATEGORY_URL:"http://localhost:61061/api/category",
   API_MESSAGE_URL:"http://localhost:61061/api/message",
   
  

   firebaseConfig : {
    apiKey: "AIzaSyDmFHaLB2HJDc7WSg9B6FGgZ9eBATcijWw",
    authDomain: "letgoecommerce.firebaseapp.com",
    projectId: "letgoecommerce",
    storageBucket: "letgoecommerce.appspot.com",
    messagingSenderId: "457172114778",
    appId: "1:457172114778:web:41f0d03e5ad0fc2c946763",
    measurementId: "G-HCS6KRBGN8"
  },
};






/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
