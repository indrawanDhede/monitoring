import express from "express";
const routes = express.Router();
import homeController from "../../controllers/web/home_controller";

routes.get("/home", homeController.home);

export default routes;
