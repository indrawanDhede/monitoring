import * as session from "express-session";
// import MySQLStoreFactory from "express-mysql-session";
// const MySQLStore = MySQLStoreFactory(session);
import dotenv from "dotenv";
dotenv.config();

// const options = {
//   host: process.env.DB_HOST as string,
//   port: parseInt(process.env.DB_PORT as string, 10),
//   user: process.env.DB_USERNAME as string,
//   password: process.env.DB_PASSWORD as string,
//   database: process.env.DB_NAME as string,
// };

// const storeOptions = {
//   ...options,
//   unset: "destroy",
// };

// const sessionStore = new MySQLStore(storeOptions);

const expressSession = session.default({
  secret: process.env.SECRET_KEY as string,
  // store: sessionStore,
  resave: false,
  saveUninitialized: false,
  rolling: true,
});

// sessionStore
//   .onReady()
//   .then(() => {
//     console.log("MySQLStore ready");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

export default expressSession;