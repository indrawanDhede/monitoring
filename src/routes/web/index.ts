import express from "express";
const routes = express.Router();
import homeRoutes from './home_routes'

// WEB WITH VERSION
routes.use("/v1", homeRoutes);

export default routes