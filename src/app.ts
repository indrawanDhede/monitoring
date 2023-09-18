import express, { Application } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors"
import compression from "compression";
import dotenv from "dotenv";
import db from "./config/database";
import apiRoutes from "./routes/api";
import webRoutes from "./routes/web";
import session from "./middleware/session";
import { notFound } from "./middleware/error_notfound";
import { errorhandler } from "./middleware/error_handler";
import authorization from "./middleware/authorization";
dotenv.config();

const app: Application = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session);
app.use(helmet());
app.use(cors());
app.use(compression());

// routes
app.use("/api", authorization, apiRoutes)
app.use("/web", authorization, webRoutes)
// not found
app.use(notFound)
// error handler
app.use(errorhandler)

db.sync()
  .then(() => {
    app.listen(process.env.PORT_SERVER, () => {
      console.log("app running on port", process.env.PORT_SERVER);
    });
  })
  .catch((err) => {
    console.log(`ERROR CONNECTION : ${err}`);
  });