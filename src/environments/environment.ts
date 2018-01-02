// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCivIuI1tmyK8jVQE5au18fOfmeQ7WE9Ao',
    authDomain: 'ilclub-b2c.firebaseapp.com',
    databaseURL: 'https://ilclub-b2c.firebaseio.com',
    projectId: 'ilclub-b2c',
    storageBucket: 'ilclub-b2c.appspot.com',
    messagingSenderId: '242819169401'
  }
};
