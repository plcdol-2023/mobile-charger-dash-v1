import * as Realm from 'realm-web';

// Create the Application
const app = new Realm.App({ id: process.env.REACT_APP_MONGO_APP_ID });
// const credentials = Realm.Credentials.emailPassword(
//   process.env.REACT_APP_MONGO_DEV_ID,
//   process.env.REACT_APP_MONGO_DEV_PW
// );
const credentials = Realm.Credentials.apiKey(
  process.env.REACT_APP_MONGO_API_KEY
);

export { app, credentials };
